package com.boilerplate.common.dto;

import com.boilerplate.common.enums.EmailType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailNotificationDto implements Serializable {

    private Long id;
    private String title;
    private String sendTo;
    private String sendFrom;
    private String message;
    private String sendToBcc;
    private EmailType emailType;
    private Map<String, Object> templateModel;
}
