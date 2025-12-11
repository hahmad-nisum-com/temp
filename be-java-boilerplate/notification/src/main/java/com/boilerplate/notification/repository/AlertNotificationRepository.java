package com.boilerplate.notification.repository;

import com.boilerplate.notification.entity.AlertNotification;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface AlertNotificationRepository extends JpaRepository<AlertNotification, Long> {

    List<AlertNotification> findAllByUserIdAndIsReadFalse(UUID userId);
    boolean existsByUserIdAndReferenceIdAndIsReadFalse(UUID userId, Long referenceId);

}
