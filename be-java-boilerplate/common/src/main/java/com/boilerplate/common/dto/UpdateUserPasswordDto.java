package com.boilerplate.common.dto;
import com.boilerplate.common.utilities.PasswordValidator;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
@Builder
public class UpdateUserPasswordDto implements Serializable {

    @NotBlank(message = "Current Password is required")
    @PasswordValidator
    private String currentPassword;

    @NotBlank(message = "New Password is required")
    @PasswordValidator
    private String newPassword;

    @NotBlank(message = "Confirm Password is required")
    private String confirmPassword;

}