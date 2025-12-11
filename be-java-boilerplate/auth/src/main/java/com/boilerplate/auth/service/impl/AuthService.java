package com.boilerplate.auth.service.impl;

import com.boilerplate.auth.entity.RefreshToken;
import com.boilerplate.auth.externalservice.IUserService;
import com.boilerplate.auth.jwt.JwtUtils;
import com.boilerplate.auth.model.request.LoginRequest;
import com.boilerplate.auth.model.response.JwtResponse;
import com.boilerplate.auth.service.*;
import com.boilerplate.common.customexception.BadCredentialsException;
import com.boilerplate.common.customexception.BadRequestException;
import com.boilerplate.common.dto.RefreshTokenDto;
import com.boilerplate.common.dto.ThirdPartyAuthResponseDto;
import com.boilerplate.common.dto.UserDto;

import java.time.ZoneId;
import java.util.*;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final AuthenticationManager authenticationManager;
    private final ILoggingLogService loggingLogService;
    private final JwtUtils jwtUtils;
    private final IUserService userService;
    private final UserDetailsService userDetailsService;
    private final IRefreshTokenService refreshTokenService;

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest, HttpServletRequest request) {
        log.debug("Signing-In: {}", loginRequest.getEmail());

        String loginRequestEmail = loginRequest.getEmail();
        Authentication authentication;
        try {
            if (loggingLogService.isBlocked(loginRequestEmail)) {
                throw new LockedException(ACCOUNT_BLOCKED);
            }
            authentication = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequestEmail, loginRequest.getPassword()));
            loggingLogService.clearFailedLoginAttempts(loginRequestEmail);
        } catch (LockedException e) {
            throw new BadCredentialsException(e.getMessage());
        } catch (Exception e) {
            loggingLogService.recordAndHandleFailedLogin(loginRequestEmail);
            throw new BadCredentialsException("Please Enter Valid Username & Password");
        }
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadCredentialsException("Error: Could Not Authenticate User: " + loginRequestEmail);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String accessToken = jwtUtils.generateJwtToken(userDetails);
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);
        refreshTokenService.saveLoginTokensAtomically(userDetails.getId(), accessToken, buildUserRefreshToken(userDetails.getId(), refreshToken, request));
        return createJwtResponse(userDetails, accessToken, refreshToken);
    }

    @Override
    public JwtResponse thirdPartyAuthenticateUser(DefaultOidcUser principalUser, String clientRegistrationId, HttpServletRequest request) {

        String firstName = principalUser.getGivenName();
        String lastName = principalUser.getFamilyName();
        String email = principalUser.getEmail();
        var authResponseDto = ThirdPartyAuthResponseDto.builder().firstName(firstName).lastName(lastName)
            .email(email).build();
        UserDto userDto = userService.thirdPartyLogin(clientRegistrationId, authResponseDto);
        String jwtAccessToken = jwtUtils.generateJwtToken(UserDetailsImpl.build(userDto));
        String jwtRefreshToken = jwtUtils.generateRefreshToken(UserDetailsImpl.build(userDto));

        refreshTokenService.saveLoginTokensAtomically(userDto.getId(), jwtAccessToken, buildUserRefreshToken(userDto.getId(), jwtRefreshToken, request));
        return jwtUtils.getJwtResponse(jwtAccessToken,jwtRefreshToken, userDto.getUserRole().getName(), userDto.getId(), userDto.getUuid(), email);
    }

    @Override
    public JwtResponse createAccessTokenFromRefreshToken(RefreshTokenDto refreshTokenDto) {
        try {
            String refreshToken = refreshTokenDto.getRefreshToken();
            RefreshToken tokenEntity = refreshTokenService.findByRefreshToken(refreshToken);
            if (!jwtUtils.validateToken(refreshToken)) {
                throw new BadRequestException("Invalid refresh token");
            }
            Claims claims = jwtUtils.getAllClaimsFromToken(refreshToken);
            if (!claims.getId().equals(tokenEntity.getId().toString())) {
                throw new BadRequestException("Token ID mismatch");
            }

            UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(jwtUtils.getUserNameFromJwtToken(refreshToken));
            String accessToken = jwtUtils.generateJwtToken(userDetails);
            refreshTokenService.storeAccessTokenInRedis(accessToken, userDetails.getId());
            return createJwtResponse(userDetails, accessToken, refreshToken);
        } catch (Exception ex) {
            log.error("Error creating access token from refresh token", ex);
            throw new BadCredentialsException("Could not create access token from refresh token");
        }
    }

    private JwtResponse createJwtResponse(UserDetailsImpl userDetails, String accessToken, String refreshToken) {
        return JwtResponse.builder().message("Token Generated").accessToken(accessToken).refreshToken(refreshToken).status(true)
                .userRole(jwtUtils.extractUserRole(accessToken)).id(userDetails.getId())
                .uuid(UUID.fromString(userDetails.getUuid())).email(userDetails.getEmail()).build();
    }

    private RefreshToken buildUserRefreshToken(Long userId, String jwtRefreshToken, HttpServletRequest request) {
        Claims claims = jwtUtils.getAllClaimsFromToken(jwtRefreshToken);
        return RefreshToken.builder().userId(userId).refreshToken(jwtRefreshToken)
                .ipAddress(request.getRemoteAddr()).userAgent(request.getHeader(USER_AGENT))
                .expiryDate(claims.getExpiration().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime())
                .createdDate(claims.getIssuedAt().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime())
                .build();
    }


}