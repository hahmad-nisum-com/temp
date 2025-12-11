package com.boilerplate.auth.externalservice;

import com.boilerplate.auth.fallback.NotificationServiceFallback;
import com.boilerplate.auth.fallback.UserServiceFallback;
import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.boilerplate.common.utilities.Constants.*;

@FeignClient(name = "boilerplate-notification", fallbackFactory = NotificationServiceFallback.class)
public interface INotificationService {

    @GetMapping(API + NOTIFICATION + ALERT)
    void sendNotificationToUser(@Valid @RequestBody AlertNotificationDto alertNotificationDto);

    @PostMapping(API + NOTIFICATION + SEND_EMAIL)
    void sendEmail(@Valid @RequestBody EmailNotificationDto notificationDto);
}
