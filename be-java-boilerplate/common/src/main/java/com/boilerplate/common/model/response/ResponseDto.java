package com.boilerplate.common.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDto {

    private String message;
    private Boolean status;
}
