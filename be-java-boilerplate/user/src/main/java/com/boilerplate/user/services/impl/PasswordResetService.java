package com.boilerplate.user.services.impl;
import com.boilerplate.common.customexception.NotFoundException;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.dto.UserDto;
import com.boilerplate.common.enums.EmailType;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.user.entity.PasswordResetToken;
import com.boilerplate.user.entity.User;
import com.boilerplate.user.externalservice.INotificationService;
import com.boilerplate.user.services.IPasswordResetService;
import com.boilerplate.user.services.ITokenService;
import com.boilerplate.user.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService implements IPasswordResetService{

    private final IUserService userService;
    private final ITokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final INotificationService notificationService;

    @Override
    public void createAndSendToken(String email) {
        Optional<User> user = userService.getUserEntityByEmail(email);
        User existingUser = user.orElseThrow(()-> new NotFoundException("User Not Found With Email: " + email));

        PasswordResetToken token = tokenService.generateToken(existingUser);
        tokenService.saveToken(token);
        EmailNotificationDto emailNotificationDto = getEmailNotificationDto(existingUser.getUserName(), existingUser.getEmail(), token);
        notificationService.sendEmail(emailNotificationDto);
    }

    @Override
    @Transactional
    public void updatePassword(String token, String newPassword) {
        PasswordResetToken passwordResetToken = tokenService.validateToken(token);
        userService.updateUserPassword(passwordResetToken.getUser().getUuid(), newPassword);
        tokenService.deleteByToken(passwordResetToken);
    }

    private static EmailNotificationDto getEmailNotificationDto(String username,String userEmail, PasswordResetToken token) {
        String resetLink = "https://localhost:3030/?resetModal=true&token=" + token.getToken();
        EmailNotificationDto emailNotificationDto = EmailNotificationDto.builder()
                .sendTo(userEmail)
                .title("Password Reset Request")
                .emailType(EmailType.PASSWORD_RESET)
                .templateModel(Map.of("reset_password_link", resetLink,"username", username))
                .build();
        return emailNotificationDto;
    }
}
