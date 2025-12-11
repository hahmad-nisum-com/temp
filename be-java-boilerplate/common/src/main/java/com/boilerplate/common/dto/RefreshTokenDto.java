package com.boilerplate.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenDto {

    @NotBlank(message = "refresh token cannot be blank")
    private String refreshToken;
}
