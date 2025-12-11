package com.boilerplate.user.externalservice.impl;

import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.user.externalservice.INotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationService implements INotificationService {

    @Override
    public void sendEmail(EmailNotificationDto notificationDto) {
    }
}