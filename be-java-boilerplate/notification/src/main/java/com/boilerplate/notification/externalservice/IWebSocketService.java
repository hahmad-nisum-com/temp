package com.boilerplate.notification.externalservice;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.SEND_NOTIFY;
import static com.boilerplate.common.utilities.Constants.WEBSOCKET;

import com.boilerplate.common.dto.WebSocketDto;
import com.boilerplate.notification.fallback.WebSocketServiceFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "boilerplate-websocket", fallbackFactory = WebSocketServiceFallback.class)
public interface IWebSocketService {

    @PostMapping(API + WEBSOCKET + SEND_NOTIFY)
    void sendPrivateNotification(@RequestBody WebSocketDto webSocketDto);
}
