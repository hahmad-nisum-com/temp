package com.boilerplate.user.model;

import com.boilerplate.common.utilities.PasswordValidator;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
public class UpdatePasswordDTO implements Serializable {

    @NotBlank(message = "Token cannot be blank")
    private String token;

    @NotBlank(message = "Password cannot be blank")
    @PasswordValidator
    private String password;
}
