package com.boilerplate.common.dto;

import com.boilerplate.common.enums.AlertNotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlertNotificationDto implements Serializable {

    private Long id;
    private String message;
    private UUID userId;
    @Enumerated(EnumType.STRING)
    private AlertNotificationType alertNotificationType;
    private Long referenceId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
