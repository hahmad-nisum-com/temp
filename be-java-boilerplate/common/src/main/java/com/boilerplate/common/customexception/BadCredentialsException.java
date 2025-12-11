package com.boilerplate.common.customexception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadCredentialsException extends RuntimeException {

    public BadCredentialsException(String message) {
        super(message);
    }
}
