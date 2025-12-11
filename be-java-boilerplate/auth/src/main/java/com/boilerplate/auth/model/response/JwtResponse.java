package com.boilerplate.auth.model.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse implements Serializable {

    private String accessToken;
    private String refreshToken;

    @Builder.Default
    private String type = "Bearer";
    private boolean status;
    private String message;
    private String userRole;
    private UUID uuid;
    @JsonIgnore
    private Long id;
    private String email;

    /**
     * JwtResponse.
     * @param refreshToken String
     * @param message     String
     * @param accessToken String
     * @param status      boolean
     * @param userRole    String
     * @param id          Long
     * @param uuid        UUID
     * @param email       String
     */
}
