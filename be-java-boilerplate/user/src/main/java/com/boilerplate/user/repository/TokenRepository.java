package com.boilerplate.user.repository;

import com.boilerplate.user.entity.PasswordResetToken;
import com.boilerplate.user.entity.User;

import java.time.LocalDateTime;
import java.util.Optional;

public interface TokenRepository extends CustomRepository<PasswordResetToken, Long>{
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
    void deleteByUserAndExpiryDateBefore(User user, LocalDateTime now);

}
