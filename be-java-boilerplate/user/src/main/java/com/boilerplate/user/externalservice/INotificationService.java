package com.boilerplate.user.externalservice;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.NOTIFICATION;
import static com.boilerplate.common.utilities.Constants.SEND_EMAIL;

import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.user.fallback.NotificationServiceFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import javax.validation.Valid;

@FeignClient(name = "boilerplate-notification", fallbackFactory = NotificationServiceFallback.class)
public interface INotificationService {
    @PostMapping(API + NOTIFICATION + SEND_EMAIL)
    void sendEmail(@Valid @RequestBody EmailNotificationDto notificationDto);
}
