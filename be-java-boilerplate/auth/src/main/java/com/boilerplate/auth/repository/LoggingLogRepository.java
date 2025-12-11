package com.boilerplate.auth.repository;

import com.boilerplate.auth.entity.LoggingLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoggingLogRepository extends JpaRepository<LoggingLog, Long> {
    Optional<LoggingLog> findByUsername(String username);
}
