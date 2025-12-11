package com.boilerplate.websocket.eventHandler;

import com.boilerplate.websocket.utilities.ConnectedUserTracker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final ConnectedUserTracker connectedUserTracker;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String userId = accessor.getUser().getName();
        String sessionId = accessor.getSessionId();

        connectedUserTracker.addUser(userId, sessionId);
        log.info("User connected: {} with session: {}", userId, sessionId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = StompHeaderAccessor.wrap(event.getMessage()).getSessionId();
        connectedUserTracker.removeUserBySession(sessionId);
        log.info("User disconnected: session {}", sessionId);
    }

}

