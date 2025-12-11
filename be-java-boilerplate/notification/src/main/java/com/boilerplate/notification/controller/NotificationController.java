package com.boilerplate.notification.controller;

import static com.boilerplate.common.utilities.Constants.ALERT;
import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.MARK_AS_READ;
import static com.boilerplate.common.utilities.Constants.NOTIFICATION;
import static com.boilerplate.common.utilities.Constants.NOTIFICATION_ID;
import static com.boilerplate.common.utilities.Constants.SEND_EMAIL;

import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.enums.AlertNotificationType;
import com.boilerplate.notification.service.INotificationService;
import com.boilerplate.notification.service.IUserNotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(API + NOTIFICATION)
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class NotificationController {

    @Autowired
    private INotificationService notificationService;

    @Autowired
    private IUserNotificationService userNotificationService;

    @PostMapping(SEND_EMAIL)
    public void sendEmailNotification(@Valid @RequestBody EmailNotificationDto notificationDto) {
        userNotificationService.sendEmailNotification(notificationDto);
    }

    @PostMapping(ALERT)
    public Boolean createAlertNotification(@Valid @RequestBody AlertNotificationDto alertNotificationDto) {
        return notificationService.saveAlertNotification(alertNotificationDto);
    }

    @GetMapping(ALERT)
    public ResponseEntity<Map<AlertNotificationType, List<AlertNotificationDto>>> getUnreadAlertNotifications(HttpServletRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(notificationService.getAllByUserIdGroupedByType(request));
    }

    /**
     * Marks notification as read.
     *
     * @param notificationId The ID of the notification which should be marked as read.
     * @return ResponseEntity.
     */
    @PutMapping(ALERT + MARK_AS_READ + NOTIFICATION_ID)
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Marked Read Successfully");
    }
}
