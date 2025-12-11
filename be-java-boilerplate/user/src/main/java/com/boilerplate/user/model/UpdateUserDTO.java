package com.boilerplate.user.model;
import lombok.*;

import javax.validation.constraints.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
public class UpdateUserDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String countryCode;
    private String isoCountry;
}
