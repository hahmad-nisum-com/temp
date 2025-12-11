package com.boilerplate.user.model;

import com.boilerplate.common.model.validation.CreateGroup;
import com.boilerplate.common.utilities.PasswordValidator;
import com.boilerplate.user.entity.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@Builder
public class SaveAndUpdateUserByAdminDTO implements Serializable {

    @NotBlank(message = "Email must not be blank", groups = CreateGroup.class)
    private String email;

    @NotBlank(message = "First name must not be blank", groups = CreateGroup.class)
    private String firstName;

    private String lastName;
    private String phoneNumber;
    private String countryCode;
    private String isoCountry;

    @NotBlank(message = "Password must not be blank", groups = CreateGroup.class)
    @PasswordValidator
    private String password;


    @NotNull(message = "User role must not be null", groups = CreateGroup.class)
    private UserRole userRole;
}

