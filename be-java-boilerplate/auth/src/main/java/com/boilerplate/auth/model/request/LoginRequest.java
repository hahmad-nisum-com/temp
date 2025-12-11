package com.boilerplate.auth.model.request;

import com.boilerplate.common.utilities.EmailValidator;
import com.boilerplate.common.utilities.PasswordValidator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email must not be blank")
    @EmailValidator
    private String email;

    @NotBlank(message = "Password is required")
    @PasswordValidator
    private String password;
}
