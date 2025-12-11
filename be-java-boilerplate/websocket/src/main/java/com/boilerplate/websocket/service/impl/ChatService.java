package com.boilerplate.websocket.service.impl;

import com.boilerplate.common.dto.AlertNotificationDto;
import com.boilerplate.common.dto.MessageDto;
import com.boilerplate.common.enums.AlertNotificationType;
import com.boilerplate.common.enums.MessageStatus;
import com.boilerplate.common.enums.WebSocketType;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.websocket.entity.Conversation;
import com.boilerplate.websocket.entity.Message;
import com.boilerplate.websocket.externalservice.INotificationService;
import com.boilerplate.websocket.service.IChatService;
import com.boilerplate.websocket.utilities.ConnectedUserTracker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService implements IChatService {

    private final ConversationService conversationService;
    private final INotificationService notificationService;
    private final WebSocketService webSocketService;
    private final ConnectedUserTracker connectedUserTracker;

    @Override
    public void handleIncomingChatMessage(MessageDto chatMessageDto) {
        Message chatMessage = ModelMapper.dtoToEntity(chatMessageDto, Message.class);
        conversationService.saveMessageInConversation(chatMessage);
        UUID recipientId = chatMessage.getReceiverId();
        UUID senderId = chatMessage.getSenderId();

        if (connectedUserTracker.isUserConnected(recipientId.toString())) {
            sendAndNotifyToOnlineUser(senderId, recipientId, chatMessage);
        }
        webSocketService.sendMessageToUser(senderId.toString(), "/queue/messages", chatMessage);
        saveOfflineNotification(recipientId, chatMessage);
    }

    private void sendAndNotifyToOnlineUser(UUID senderId, UUID recipientId, Message message) {
        webSocketService.notifyUser(recipientId.toString(), Map.of(WebSocketType.ALERT_NOTIFICATION, true));
        webSocketService.notifyChatForMessage(recipientId.toString(), "New Message from " + senderId + ": " + message.getMessageText());
        webSocketService.notifyUserForAllChats(recipientId.toString(), "You have unread messages");

        webSocketService.sendMessageToUser(recipientId.toString(), "/queue/messages", message);
    }

    private void saveOfflineNotification(UUID recipientId, Message chatMessage) {
        AlertNotificationDto alertNotification = AlertNotificationDto.builder()
                .userId(recipientId)
                .alertNotificationType(AlertNotificationType.NEW_CHAT)
                .referenceId(chatMessage.getConversationId())
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .message(chatMessage.getMessageText())
                .build();
        notificationService.saveAlertNotification(alertNotification);
    }
}
