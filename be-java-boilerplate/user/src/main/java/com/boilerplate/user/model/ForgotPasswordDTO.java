package com.boilerplate.user.model;

import com.boilerplate.common.utilities.EmailValidator;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ForgotPasswordDTO {

    @NotBlank(message = "Email must not be blank")
    @EmailValidator
    private String email;
}
