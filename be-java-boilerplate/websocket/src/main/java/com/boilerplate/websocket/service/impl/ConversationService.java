package com.boilerplate.websocket.service.impl;

import com.boilerplate.common.customexception.BadRequestException;
import com.boilerplate.common.customexception.BusinessException;
import com.boilerplate.common.dto.ConversationDto;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.websocket.entity.Conversation;
import com.boilerplate.websocket.entity.Message;
import com.boilerplate.websocket.repository.ConversationRepository;
import com.boilerplate.websocket.repository.MessageRepository;
import com.boilerplate.websocket.service.IConversationService;
import com.boilerplate.websocket.service.IMessagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConversationService implements IConversationService {

    private final ConversationRepository conversationRepository;
    private final IMessagingService messagingService;

    @Override
    public ConversationDto getOrCreateConversation(UUID participant1, UUID participant2) {
        if (participant1.equals(participant2)) {
            throw new BadRequestException("Participants must be different");
        }
        UUID user1;
        UUID user2;
        if (participant1.compareTo(participant2) < 0) {
            user1 = participant1;
            user2 = participant2;
        } else {
            user1 = participant2;
            user2 = participant1;
        }
        return ModelMapper.entityToDto(conversationRepository.findByParticipant1IdAndParticipant2Id(user1, user2).orElseGet(() ->
                        conversationRepository.save(Conversation.builder()
                                .participant1Id(user1)
                                .participant2Id(user2)
                                .build()))
                ,ConversationDto.class);

    }

    @Override
    public void saveMessageInConversation(Message chatMessage) {
        Optional<Conversation> conversation = conversationRepository.findById(chatMessage.getConversationId());
        if (conversation.isEmpty()) {
            throw new BusinessException("Conversation not found");
        }
        messagingService.saveMessage(chatMessage);
    }


}
