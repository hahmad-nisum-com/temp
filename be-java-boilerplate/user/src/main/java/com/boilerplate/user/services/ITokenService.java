package com.boilerplate.user.services;

import com.boilerplate.common.dto.UserDto;
import com.boilerplate.user.entity.PasswordResetToken;
import com.boilerplate.user.entity.User;

import java.time.LocalDateTime;

public interface ITokenService {
    PasswordResetToken generateToken(User user);
    PasswordResetToken validateToken(String token);
    void saveToken(PasswordResetToken token);
    void deleteByToken(PasswordResetToken token);
}
