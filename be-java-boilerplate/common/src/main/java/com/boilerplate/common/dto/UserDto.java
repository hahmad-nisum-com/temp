package com.boilerplate.common.dto;

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
public class UserDto implements Serializable {

    private Long id;
    private String uuid;
    private String userName;
    private Boolean isEmailVerified;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String countryCode;
    private String isoCountry;
    private Boolean isPasswordSet;
    private String profilePictureUrl;
    @JsonIgnore
    private String profilePictureId;
    private UserRoleDto userRole;
}
