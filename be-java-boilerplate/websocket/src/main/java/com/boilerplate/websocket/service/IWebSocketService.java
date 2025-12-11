package com.boilerplate.websocket.service;

import com.boilerplate.common.enums.WebSocketType;
import com.boilerplate.websocket.entity.Message;

import java.util.Map;

public interface IWebSocketService {

    void notifyUser(String to, Map<WebSocketType, Boolean> message);

    void notifyChatForMessage(String chatId, String message);

    void notifyUserForAllChats(String userId, String message);

    void sendMessageToUser(String senderId, String path, Message chatMessage);
}
