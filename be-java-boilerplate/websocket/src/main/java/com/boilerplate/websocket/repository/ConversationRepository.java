package com.boilerplate.websocket.repository;

import com.boilerplate.websocket.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Optional<Conversation> findByParticipant1IdAndParticipant2Id(UUID participant1Id, UUID participant2Id);
}

