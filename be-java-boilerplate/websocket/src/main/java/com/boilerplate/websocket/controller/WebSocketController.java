package com.boilerplate.websocket.controller;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.SEND_CHATS;
import static com.boilerplate.common.utilities.Constants.SEND_CHAT_MESSAGE;
import static com.boilerplate.common.utilities.Constants.SEND_NOTIFY;
import static com.boilerplate.common.utilities.Constants.WEBSOCKET;

import com.boilerplate.common.dto.WebSocketDto;
import com.boilerplate.common.dto.WebSocketMessageDto;
import com.boilerplate.websocket.service.IWebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = API + WEBSOCKET)
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class WebSocketController {

    private final IWebSocketService webSocketService;

    @PostMapping(SEND_NOTIFY)
    public void sendPrivateMessage(@RequestBody WebSocketDto webSocketDto) {
        webSocketService.notifyUser(webSocketDto.getTo(), webSocketDto.getMessageContent());
    }

    @PostMapping(SEND_CHAT_MESSAGE)
    public void sendPrivateChatMessage(@RequestBody WebSocketMessageDto messageDto) {
        webSocketService.notifyChatForMessage(messageDto.getTo(), messageDto.getMessageContent());
    }

    @PostMapping(SEND_CHATS)
    public void sendPrivateAllChats(@RequestBody WebSocketMessageDto messageDto) {
        webSocketService.notifyUserForAllChats(messageDto.getTo(), messageDto.getMessageContent());
    }
}
