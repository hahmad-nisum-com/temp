package com.boilerplate.common.dto;

import com.boilerplate.common.utilities.EmailValidator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestCheckoutRequestDto implements Serializable {

    @NotBlank(message = "Email must not be blank")
    @EmailValidator
    private String email;

    @NotBlank(message = "First Name must not be blank")
    private String firstName;

    private String lastName;

    @NotBlank(message = "shippingAddressLine1 must not be blank")
    private String shippingAddressLine1;

    private String shippingAddressLine2;

    @NotBlank(message = "shippingCity must not be blank")
    private String shippingCity;

    @NotBlank(message = "shippingState must not be blank")
    private String shippingState;

    @NotBlank(message = "shippingZipCode must not be blank")
    private String shippingZipCode;

    private String shippingCountryCode;
}
