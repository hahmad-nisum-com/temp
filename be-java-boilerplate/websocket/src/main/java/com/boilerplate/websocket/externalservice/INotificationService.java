package com.boilerplate.websocket.externalservice;

import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.websocket.fallback.NotificationServiceFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import javax.validation.Valid;

import static com.boilerplate.common.utilities.Constants.*;

@FeignClient(name = "boilerplate-notification", fallbackFactory = NotificationServiceFallback.class)
public interface INotificationService {
    @PostMapping(API + NOTIFICATION + ALERT)
    Boolean saveAlertNotification(@Valid @RequestBody AlertNotificationDto notificationDto);
}
