package com.boilerplate.common.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto implements Serializable {

    private Long id;

    @NotNull(message = "Conversation ID must not be null")
    private Long conversationId;

    @NotNull(message = "Receiver ID must not be null")
    private UUID receiverId;

    @NotNull(message = "Sender ID must not be null")
    private UUID senderId;

    @NotBlank(message = "Message text must not be null")
    @Size(min = 1, max = 10000, message = "Message must be between 1 and 10,000 characters")
    private String messageText;
}
