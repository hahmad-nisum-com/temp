package com.boilerplate.user.fallback;

import com.boilerplate.user.externalservice.INotificationService;
import com.boilerplate.user.externalservice.impl.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class NotificationServiceFallback implements FallbackFactory<INotificationService> {

    @Override
    public INotificationService create(Throwable cause) {
        log.error("An exception occurred when calling the NotificationService", cause);
        return new NotificationService();
    }
}