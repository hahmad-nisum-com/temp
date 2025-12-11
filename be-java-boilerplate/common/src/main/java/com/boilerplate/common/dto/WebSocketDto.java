package com.boilerplate.common.dto;

import com.boilerplate.common.enums.WebSocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketDto implements Serializable {

    private String to;
    private Map<WebSocketType, Boolean> messageContent;
}
