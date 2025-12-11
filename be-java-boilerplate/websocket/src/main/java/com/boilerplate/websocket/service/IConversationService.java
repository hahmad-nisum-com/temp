package com.boilerplate.websocket.service;

import com.boilerplate.common.dto.ConversationDto;
import com.boilerplate.websocket.entity.Conversation;
import com.boilerplate.websocket.entity.Message;

import java.util.UUID;

public interface IConversationService {

    ConversationDto getOrCreateConversation(UUID ParticipantId1, UUID ParticipantId2);
    void saveMessageInConversation(Message chatMessage);
}
