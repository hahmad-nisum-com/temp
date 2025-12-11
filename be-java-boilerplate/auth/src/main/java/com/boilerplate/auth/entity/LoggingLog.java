package com.boilerplate.auth.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "logging_log")
public class LoggingLog implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "total_failed_attempts")
    private int totalFailedAttempts;

    @Column(name = "last_failed_attempt_time")
    private LocalDateTime lastFailedAttemptTime;
}

