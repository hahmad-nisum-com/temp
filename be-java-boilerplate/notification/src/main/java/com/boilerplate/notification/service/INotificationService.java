package com.boilerplate.notification.service;

import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.enums.AlertNotificationType;
import com.fasterxml.jackson.core.JsonProcessingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface INotificationService {

    Boolean saveAlertNotification(AlertNotificationDto alertNotificationDto);

    void sendEmailNotification(EmailNotificationDto notificationDto, String template, String subject);

    Map<AlertNotificationType, List<AlertNotificationDto>> getAllByUserIdGroupedByType(HttpServletRequest request) throws JsonProcessingException;

    void markNotificationAsRead(Long id);
}
