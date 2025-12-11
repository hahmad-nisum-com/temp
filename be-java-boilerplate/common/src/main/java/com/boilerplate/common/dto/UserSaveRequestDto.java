package com.boilerplate.common.dto;

import com.boilerplate.common.utilities.EmailValidator;
import com.boilerplate.common.utilities.PasswordValidator;
import lombok.*;

import javax.validation.constraints.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
public class UserSaveRequestDto implements Serializable {

    @NotBlank(message = "Email must not be blank")
    @EmailValidator
    private String email;

    @NotBlank(message = "First Name must not be blank")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Password must not be blank")
    @PasswordValidator
    private String password;

    private String phoneNumber;
    private String countryCode;
    @Size(min = 2, max = 2, message = "isoCountry must be exactly 2 characters")
    private String isoCountry;

}
