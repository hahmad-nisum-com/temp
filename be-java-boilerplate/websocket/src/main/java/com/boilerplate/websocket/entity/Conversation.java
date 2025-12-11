package com.boilerplate.websocket.entity;

import com.boilerplate.common.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "conversations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"participant1_id", "participant2_id", "property_id"})
})
public class Conversation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "participant1_id")
    @Type(type = "uuid-char")
    private UUID participant1Id;

    @Column(name = "participant2_id")
    @Type(type = "uuid-char")
    private UUID participant2Id;

    @Column(name = "property_id")
    private Long propertyId;
}


