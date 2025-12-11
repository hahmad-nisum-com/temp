package com.boilerplate.notification.externalservice.impl;

import com.boilerplate.common.dto.WebSocketDto;
import com.boilerplate.notification.externalservice.IWebSocketService;
import org.springframework.stereotype.Component;

@Component
public class WebSocketService implements IWebSocketService {

    @Override
    public void sendPrivateNotification(WebSocketDto webSocketDto) {
        // Method is used to send private message when chat message is pushed to user.
    }

}
