package com.boilerplate.notification.service;

import com.boilerplate.common.dto.EmailNotificationDto;

public interface IUserNotificationService {

    void sendEmailNotification(EmailNotificationDto emailNotificationDto);
}
