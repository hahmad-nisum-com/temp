package com.boilerplate.notification.service.impl;

import com.boilerplate.common.customexception.NotFoundException;
import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.dto.WebSocketDto;
import com.boilerplate.common.enums.AlertNotificationType;
import com.boilerplate.common.enums.WebSocketType;
import com.boilerplate.common.model.response.UserDetail;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.common.utilities.Utils;
import com.boilerplate.notification.entity.AlertNotification;
import com.boilerplate.notification.externalservice.IWebSocketService;
import com.boilerplate.notification.repository.AlertNotificationRepository;
import com.boilerplate.notification.service.INotificationService;
import com.boilerplate.notification.utilities.EmailUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final AlertNotificationRepository alertNotificationRepository;
    private final EmailUtil emailUtil;
    private final TemplateEngine templateEngine;
    private final Utils utils;
    private final IWebSocketService webSocketService;

    @Override
    public void sendEmailNotification(EmailNotificationDto notificationDto, String template, String subject) {

        Context context = new Context();
        context.setVariables(notificationDto.getTemplateModel());
        String html = templateEngine.process(template, context);
        notificationDto.setTitle(subject);
        notificationDto.setMessage(html);
        try {
            emailUtil.sendMail(notificationDto);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
        }
    }

    @Override
    public Boolean saveAlertNotification(AlertNotificationDto alertNotificationDto) {
        if (alertNotificationDto.getAlertNotificationType() == AlertNotificationType.NEW_CHAT
                && alertNotificationRepository.existsByUserIdAndReferenceIdAndIsReadFalse(alertNotificationDto.getUserId(),
                alertNotificationDto.getReferenceId())) {
            return false;
        }
        alertNotificationRepository.save(ModelMapper.dtoToEntity(alertNotificationDto, AlertNotification.class));
        return true;
    }

    @Override
    public Map<AlertNotificationType, List<AlertNotificationDto>> getAllByUserIdGroupedByType(HttpServletRequest request) throws JsonProcessingException {
        UserDetail loggedInUser = utils.decodeJwt(request);
        List<AlertNotification> alertNotifications = alertNotificationRepository.findAllByUserIdAndIsReadFalse(loggedInUser.getUuid());
        List<AlertNotificationDto> alertNotificationDtos = ModelMapper.listEntityToDto(alertNotifications, AlertNotificationDto.class);

        // Group by AlertNotificationType
        return alertNotificationDtos.stream()
                .collect(Collectors.groupingBy(AlertNotificationDto::getAlertNotificationType));
    }

    @Override
    public void markNotificationAsRead(Long id) {
        Optional<AlertNotification> notification = alertNotificationRepository.findById(id);
        if (notification.isEmpty()) {
            throw new NotFoundException("Notification Not Found");
        }
        notification.get().setIsRead(true);
        alertNotificationRepository.save(notification.get());
    }

    private void sendPushNotificationToUser(Long userId) {
        try {
            Map<WebSocketType, Boolean> webSocketMap = Collections.singletonMap(WebSocketType.ALERT_NOTIFICATION, true);
            webSocketService.sendPrivateNotification(WebSocketDto.builder().to(userId.toString()).messageContent(webSocketMap).build());
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
        }
    }
}
