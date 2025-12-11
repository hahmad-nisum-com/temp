package com.boilerplate.notification.fallback;

import com.boilerplate.notification.externalservice.IWebSocketService;
import com.boilerplate.notification.externalservice.impl.WebSocketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WebSocketServiceFallback implements FallbackFactory<IWebSocketService> {

    @Override
    public IWebSocketService create(Throwable cause) {
        log.error("An exception occurred when calling the IWebSocketServer", cause);
        return new WebSocketService();
    }
}
