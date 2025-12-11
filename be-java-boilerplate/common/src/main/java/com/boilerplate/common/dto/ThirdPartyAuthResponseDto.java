package com.boilerplate.common.dto;
import com.boilerplate.common.utilities.EmailValidator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThirdPartyAuthResponseDto implements Serializable {

    @NotBlank(message = "Email must not be blank")
    @EmailValidator
    private String email;

    @NotBlank(message = "First Name must not be Empty")
    private String firstName;

    @NotBlank(message = "Last Name must not be Empty")
    private String lastName;
}
