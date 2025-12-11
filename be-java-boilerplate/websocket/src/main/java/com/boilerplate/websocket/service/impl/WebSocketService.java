package com.boilerplate.websocket.service.impl;

import com.boilerplate.common.enums.WebSocketType;
import com.boilerplate.websocket.entity.Message;
import com.boilerplate.websocket.model.response.ResponseMessage;
import com.boilerplate.websocket.service.IWebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketService implements IWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void notifyUser(final String to, final Map<WebSocketType, Boolean> message) {
        log.info("sending notification to: {}", to);
        ResponseMessage response = new ResponseMessage(message.toString());
        messagingTemplate.convertAndSendToUser(to, "/notify", response);
    }

    @Override
    public void notifyChatForMessage(final String chatId, final String message) {
        log.info("sending notification for chat: {}", chatId);
        ResponseMessage response = new ResponseMessage(message);
        messagingTemplate.convertAndSendToUser(chatId, "/chat", response);
    }

    @Override
    public void notifyUserForAllChats(final String userId, final String message) {
        log.info("sending notification to user: {}", userId);
        ResponseMessage response = new ResponseMessage(message);
        messagingTemplate.convertAndSendToUser(userId, "/all-chats", response);
    }

    @Override
    public void sendMessageToUser(String recipientId, String path, Message chatMessage) {
        messagingTemplate.convertAndSendToUser(recipientId, "/queue/messages", chatMessage);
    }
}

