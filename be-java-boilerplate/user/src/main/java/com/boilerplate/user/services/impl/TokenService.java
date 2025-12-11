package com.boilerplate.user.services.impl;

import com.boilerplate.common.customexception.NotFoundException;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.utilities.Generator;
import com.boilerplate.user.entity.PasswordResetToken;
import com.boilerplate.user.entity.User;
import com.boilerplate.user.repository.TokenRepository;
import com.boilerplate.user.repository.UserRepository;
import com.boilerplate.user.services.ITokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

import static com.boilerplate.common.utilities.Constants.TOKEN_EXPIRATION_TIME;
import static com.boilerplate.common.utilities.Constants.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService implements ITokenService {

    private final TokenRepository tokenRepository;

    @Override
    public PasswordResetToken generateToken(User user) {
        Optional<PasswordResetToken> existingToken = tokenRepository.findByUser(user);
        if (existingToken.isPresent()) {
            PasswordResetToken token = existingToken.get();
            if (!token.isExpired()) {
                return token;
            }
            tokenRepository.delete(token);
        }
        String token = Generator.createRestPasswordToken();
        return buildResetToken(token, user);
    }

    @Override
    public PasswordResetToken validateToken(String token) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new NotFoundException("Token not found."));
        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            log.warn("Password reset token expired for user: {}", resetToken.getUser().getEmail());
            throw new ResponseStatusException(HttpStatus.GONE);
        }
        return resetToken;
    }

    @Override
    public void saveToken(PasswordResetToken token) {
        tokenRepository.save(token);
    }

    @Override
    public void deleteByToken(PasswordResetToken token) {
        tokenRepository.delete(token);
    }


    private static PasswordResetToken buildResetToken(String token, User user) {
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token).user(user)
                .expiryDate(LocalDateTime.now().plusHours(TOKEN_EXPIRATION_TIME)).build();
        return resetToken;
    }
}

