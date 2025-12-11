package com.boilerplate.websocket.entity;
import com.boilerplate.common.enums.MessageStatus;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conversation_id")
    private Long conversationId;

    @Column(name = "receiver_id")
    @Type(type = "uuid-char")
    private UUID receiverId;

    @Column(name = "sender_id")
    @Type(type = "uuid-char")
    private UUID senderId;

    @Column(name = "message_text", columnDefinition = "TEXT")
    private String messageText;

    @Column(name = "send_at")
    private LocalDateTime sendAt;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "message_status")
    private MessageStatus messageStatus = MessageStatus.SENT;
}

