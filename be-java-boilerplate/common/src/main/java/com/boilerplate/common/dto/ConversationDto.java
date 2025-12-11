package com.boilerplate.common.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDto implements Serializable {

    private Long id;
    private UUID participant1Id;
    private UUID participant2Id;
    private Long propertyId;
}
