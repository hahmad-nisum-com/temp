package com.boilerplate.auth.service.impl;

import com.boilerplate.auth.entity.LoggingLog;
import com.boilerplate.auth.externalservice.INotificationService;
import com.boilerplate.auth.externalservice.IUserService;
import com.boilerplate.auth.repository.LoggingLogRepository;
import com.boilerplate.auth.service.ILoggingLogService;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.dto.UpdateAccountStatusDto;
import com.boilerplate.common.enums.AccountStatus;
import com.boilerplate.common.enums.EmailSubject;
import com.boilerplate.common.enums.EmailType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoggingLogService implements ILoggingLogService {

    private final IUserService userService;
    private final INotificationService notificationService;
    private final LoggingLogRepository loggingLogRepository;

    @Override
    public void recordAndHandleFailedLogin(String email) {
        LoggingLog attempt = loggingLogRepository.findByUsername(email)
                                                          .orElse(LoggingLog.builder().username(email).build());
        attempt.setTotalFailedAttempts(attempt.getTotalFailedAttempts() + 1);
        attempt.setLastFailedAttemptTime(LocalDateTime.now());
        loggingLogRepository.save(attempt);
        if (LAST_FAILED_ATTEMPT == attempt.getTotalFailedAttempts()) {
            notificationService.sendEmail(getEmailNotificationDto(attempt, email, ACCOUNT_BLOCK_WARNING));
        }
        if (MAX_FAILED_ATTEMPTS <= attempt.getTotalFailedAttempts()) {
            String userStatus = userService.updateUserAccountStatus(email, new UpdateAccountStatusDto(AccountStatus.TEMP_BLOCKED));
            log.info("User status response : {} ", userStatus);
            notificationService.sendEmail(getEmailNotificationDto(attempt, email, ACCOUNT_BLOCKED));
        }
    }

    @Override
    public void clearFailedLoginAttempts(String email) {
        Optional<LoggingLog> loginAttemptEntry = loggingLogRepository.findByUsername(email);
        loginAttemptEntry.ifPresent(loggingLogRepository::delete);
    }

    @Override
    public boolean isBlocked(String email) {
        return loggingLogRepository.findByUsername(email).map(attempt -> {
            if (MAX_FAILED_ATTEMPTS <= attempt.getTotalFailedAttempts() &&
                    Duration.between(attempt.getLastFailedAttemptTime(), LocalDateTime.now()).toMinutes() >= TEMP_BLOCK_DURATION.toMinutes()) {
                loggingLogRepository.delete(attempt);
                String userStatus = userService.updateUserAccountStatus(email, new UpdateAccountStatusDto(AccountStatus.TEMP_BLOCKED));
                log.info("User status response: {} ", userStatus);
                return false;
            }
            return attempt.getTotalFailedAttempts() >= MAX_FAILED_ATTEMPTS;
        }).orElse(false);
    }

    private static EmailNotificationDto getEmailNotificationDto(LoggingLog attempt, String userEmail,
                                                                String detailedMessage) {
        return EmailNotificationDto.builder()
                .sendTo(userEmail)
                .title(EmailSubject.ACCOUNT_BLOCK_SUBJECT.getSubjectName())
                .emailType(EmailType.ACCOUNT_BLOCK)
                .templateModel(Map.of("email", userEmail,
                 "attempts_left", MAX_FAILED_ATTEMPTS - attempt.getTotalFailedAttempts(),
                 "detailed_message", detailedMessage))
                .build();
    }
}