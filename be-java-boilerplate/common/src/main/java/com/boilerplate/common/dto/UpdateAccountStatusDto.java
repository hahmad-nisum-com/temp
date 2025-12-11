package com.boilerplate.common.dto;

import com.boilerplate.common.enums.AccountStatus;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccountStatusDto implements Serializable {

    @NotNull(message = "Account Status cannot be null")
    private AccountStatus accountStatus;

}
