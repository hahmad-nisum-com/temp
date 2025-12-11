package com.boilerplate.websocket.controller;

import com.boilerplate.common.dto.ConversationDto;
import com.boilerplate.common.dto.MessageDto;
import com.boilerplate.websocket.service.IChatService;
import com.boilerplate.websocket.service.IConversationService;
import com.boilerplate.websocket.service.IMessagingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.boilerplate.common.utilities.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = API + CONVERSATION)
public class ChatController {

    private final IConversationService conversationService;
    private final IMessagingService messagingService;
    private final IChatService chatService;

    @GetMapping(INITIATE_CHAT)
    public ResponseEntity<ConversationDto> getOrCreateConversation(@RequestParam("participantId1") UUID participantId1,
                                                                   @RequestParam("participantId2") UUID participantId2) {
        return ResponseEntity.ok(conversationService.getOrCreateConversation(participantId1, participantId2));
    }

    @GetMapping(MESSAGES)
    public ResponseEntity<List<MessageDto>> getMessages(@RequestParam Long conversationId) {
        return ResponseEntity.ok(messagingService.getMessagesByConversation(conversationId));
    }

    // Handle WebSocket message
    @MessageMapping(CHAT)
    public void processMessage(@Payload MessageDto messageDto) {
        chatService.handleIncomingChatMessage(messageDto);
    }
}


