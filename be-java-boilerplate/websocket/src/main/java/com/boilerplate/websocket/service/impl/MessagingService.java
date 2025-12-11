package com.boilerplate.websocket.service.impl;

import com.boilerplate.common.customexception.BusinessException;
import com.boilerplate.common.dto.MessageDto;
import com.boilerplate.common.utilities.ModelMapper;
import com.boilerplate.websocket.entity.Conversation;
import com.boilerplate.websocket.entity.Message;
import com.boilerplate.websocket.repository.ConversationRepository;
import com.boilerplate.websocket.repository.MessageRepository;
import com.boilerplate.websocket.service.IMessagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessagingService implements IMessagingService {

    private final MessageRepository messageRepository;

    public void saveMessage(Message chatMessage) {
       messageRepository.save(chatMessage);
    }

    public List<MessageDto> getMessagesByConversation(Long conversationId) {
        return ModelMapper.listEntityToDto(messageRepository.findByConversationIdOrderBySendAtAsc(conversationId), MessageDto.class);
    }


}