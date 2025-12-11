package com.boilerplate.auth.service;

import com.boilerplate.auth.entity.RefreshToken;

import javax.servlet.http.HttpServletRequest;

public interface IRefreshTokenService {
    RefreshToken findByRefreshToken(String token);
    void saveRefreshToken(RefreshToken refreshToken);
    void revokeRefreshToken(String refreshToken);
    void revokeAccessToken(HttpServletRequest request);
    void storeAccessTokenInRedis(String accessToken, Long id);
    void saveLoginTokensAtomically(Long id, String accessToken, RefreshToken refreshToken);
}

