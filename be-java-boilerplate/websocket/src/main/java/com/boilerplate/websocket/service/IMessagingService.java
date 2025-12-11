package com.boilerplate.websocket.service;

import com.boilerplate.common.dto.MessageDto;
import com.boilerplate.websocket.entity.Conversation;
import com.boilerplate.websocket.entity.Message;

import java.util.List;

public interface IMessagingService {
    List<MessageDto> getMessagesByConversation(Long conversationId);
    void saveMessage(Message message);
}
