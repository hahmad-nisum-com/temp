package com.boilerplate.websocket.service;

import com.boilerplate.common.dto.MessageDto;
import com.boilerplate.websocket.entity.Message;

public interface IChatService {
    void handleIncomingChatMessage(MessageDto chatMessage);
}
