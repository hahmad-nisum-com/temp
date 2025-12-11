package com.boilerplate.auth.service.impl;

import com.boilerplate.auth.entity.RefreshToken;
import com.boilerplate.auth.repository.RefreshTokenRepository;
import com.boilerplate.auth.service.IRefreshTokenService;
import com.boilerplate.common.customexception.BusinessException;
import com.boilerplate.common.customexception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class RefreshTokenService implements IRefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.access.expiration}")
    private Long jwtAccessExpiration;

    @Override
    public void saveRefreshToken(RefreshToken refreshToken) {
        Optional<RefreshToken> existingRefreshToken = refreshTokenRepository.findByRefreshTokenAndRevokedFalse(refreshToken.getRefreshToken());
        if(existingRefreshToken.isPresent()){
            throw new BusinessException("Refresh Token Already Exists");
        }
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void storeAccessTokenInRedis(String accessToken, Long id) {
        redisTemplate.opsForValue().set(accessToken, String.valueOf(id), jwtAccessExpiration, TimeUnit.MILLISECONDS);
    }

    @Override
    public void saveLoginTokensAtomically(Long userId, String accessToken, RefreshToken refreshToken) {
        try {
            storeAccessTokenInRedis(accessToken, userId);
            saveRefreshToken(refreshToken);
        } catch (Exception ex) {
            rollbackAccessTokenSilently(accessToken);
            throw new BusinessException("Failed to persist login tokens", ex);
        }
    }

    @Override
    public void revokeRefreshToken(String refreshToken) {
        RefreshToken userRefreshToken = refreshTokenRepository.findByRefreshTokenAndRevokedFalse(refreshToken)
                        .orElseThrow(() -> new NotFoundException("Invalid Refresh Token"));
        userRefreshToken.setRevoked(true);
        refreshTokenRepository.save(userRefreshToken);
    }

    @Override
    public void revokeAccessToken(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        if (StringUtils.hasText(accessToken) && accessToken.startsWith( "Bearer ")) {
            accessToken = accessToken.substring(7);
            redisTemplate.delete(accessToken);
        }else {
            throw new BusinessException("Access Token Not Found");
        }
    }

    @Override
    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshTokenAndRevokedFalse(refreshToken)
                .orElseThrow(() -> new BusinessException("Invalid refresh token"));
    }


    private void rollbackAccessTokenSilently(String accessToken) {
        try {
            redisTemplate.delete(accessToken);
        } catch (Exception ex) {
            log.warn("Failed to rollback access token from Redis: {}", accessToken, ex);
        }
    }
}
