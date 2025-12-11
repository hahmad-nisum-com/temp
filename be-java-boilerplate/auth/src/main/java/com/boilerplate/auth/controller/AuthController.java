package com.boilerplate.auth.controller;

import com.boilerplate.auth.model.request.LoginRequest;
import com.boilerplate.auth.model.response.JwtResponse;
import com.boilerplate.auth.service.IAuthService;
import com.boilerplate.auth.service.IRefreshTokenService;
import com.boilerplate.common.dto.RefreshTokenDto;
import lombok.RequiredArgsConstructor;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@RestController
@CrossOrigin(originPatterns = "*", maxAge = 3600)
@RequestMapping(API + AUTH)
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;
    private final IRefreshTokenService refreshTokenService;

  /**
     * authenticateUser.
     *
     * @param loginRequest loginRequest
     * @return ResponseEntity
     */

    @PostMapping(LOGIN)
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest, request));
    }

    @PostMapping(LOGOUT)
    public ResponseEntity<String> logoutUser(HttpServletRequest request, @Valid @RequestBody RefreshTokenDto refreshTokenDto) {
        refreshTokenService.revokeRefreshToken(refreshTokenDto.getRefreshToken());
        refreshTokenService.revokeAccessToken(request);
      return ResponseEntity.ok("Logout Successful");
    }

    /**
     * authenticateUser.
     *
     * @param request request
     * @return ResponseEntity
     */
    @GetMapping(THIRD_PARTY_AUTHENTICATION_CALLBACK)
    public ResponseEntity<Object> thirdPartyAuth(HttpServletRequest request) {

      Authentication authentication = (Authentication) request.getSession().getAttribute(AUTHENTICATION_DATA);
      if (Objects.isNull(authentication)) {
        return ResponseEntity.badRequest().body("This is not a valid request");
      }

      String clientRegistrationId = null;
      if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
        clientRegistrationId = oauthToken.getAuthorizedClientRegistrationId();
      }
      var principalUser = (DefaultOidcUser) authentication.getPrincipal();
      return ResponseEntity.ok(authService.thirdPartyAuthenticateUser(principalUser, clientRegistrationId, request));
    }

  /**
   * refreshUserAccessToken.
   *
   * @param refreshTokenDto refreshTokenDto
   * @return ResponseEntity
   */

    @PostMapping(REFRESH_TOKEN)
    public ResponseEntity<Object> refreshToken(@Valid @RequestBody RefreshTokenDto refreshTokenDto) {
      return ResponseEntity.ok(authService.createAccessTokenFromRefreshToken(refreshTokenDto));
    }

}
