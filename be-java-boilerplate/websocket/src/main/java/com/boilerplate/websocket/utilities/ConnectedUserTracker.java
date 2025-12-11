package com.boilerplate.websocket.utilities;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class ConnectedUserTracker {

    private final Map<String, String> connectedUsers = new ConcurrentHashMap<>();

    public void addUser(String userId, String sessionId) {
        connectedUsers.put(userId, sessionId);
        log.info("User connected: {} with session: {}", userId, sessionId);
    }

    public void removeUserBySession(String sessionId) {
        connectedUsers.entrySet().removeIf(entry -> entry.getValue().equals(sessionId));
        log.info("User disconnected: session {}", sessionId);
    }

    public boolean isUserConnected(String userId) {
        return connectedUsers.containsKey(userId);
    }

    public Optional<String> getSessionId(String userId) {
        log.info("Checking session for user: {}", userId);
        return Optional.ofNullable(connectedUsers.get(userId));
    }
}

