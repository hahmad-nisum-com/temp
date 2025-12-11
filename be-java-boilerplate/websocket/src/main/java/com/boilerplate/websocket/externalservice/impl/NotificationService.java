package com.boilerplate.websocket.externalservice.impl;

import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.websocket.externalservice.INotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationService implements INotificationService {

    @Override
    public Boolean saveAlertNotification(AlertNotificationDto notificationDto) {
       return false;
    }
}