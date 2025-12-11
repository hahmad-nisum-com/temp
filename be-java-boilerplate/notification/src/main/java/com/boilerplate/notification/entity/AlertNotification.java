package com.boilerplate.notification.entity;

import com.boilerplate.common.entity.BaseEntity;
import com.boilerplate.common.enums.AlertNotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "alert_notification")
public class AlertNotification extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Column(name = "user_id", nullable = false)
    @Type(type = "uuid-char")
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "alert_notification_type", nullable = false)
    private AlertNotificationType alertNotificationType;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = Boolean.FALSE;
}