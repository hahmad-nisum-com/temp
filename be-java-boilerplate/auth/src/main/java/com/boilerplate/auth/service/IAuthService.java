package com.boilerplate.auth.service;

import com.boilerplate.auth.model.request.LoginRequest;
import com.boilerplate.auth.model.response.JwtResponse;
import com.boilerplate.common.dto.RefreshTokenDto;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;

import javax.servlet.http.HttpServletRequest;

public interface IAuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest, HttpServletRequest request);
    JwtResponse thirdPartyAuthenticateUser(DefaultOidcUser principalUser, String provider, HttpServletRequest request);
    JwtResponse createAccessTokenFromRefreshToken(RefreshTokenDto refreshTokenDto);
}
