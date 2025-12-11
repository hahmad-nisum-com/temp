package com.boilerplate.auth.externalservice.impl;

import com.boilerplate.auth.externalservice.INotificationService;
import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationService implements INotificationService {

    @Override
    public void sendNotificationToUser(AlertNotificationDto alertNotificationDto) {

    }
    @Override
    public void sendEmail(EmailNotificationDto notificationDto) {

    }
}
