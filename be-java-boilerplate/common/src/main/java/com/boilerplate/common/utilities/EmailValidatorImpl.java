package com.boilerplate.common.utilities;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

import static com.boilerplate.common.utilities.Constants.EMAIL_FORMAT_REGEXP;

public class EmailValidatorImpl implements ConstraintValidator<EmailValidator, String> {

    /**
     * No initialization required since @EmailValidator has no parameters.
     * This method is part of the ConstraintValidator lifecycle.
     */
    @Override
    public void initialize(EmailValidator constraintAnnotation) {
        // no-op
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        // Skip validation if null or blank — handled by @NotBlank
        if (email == null || email.trim().isEmpty()) {
            return true;
        }
        return Pattern.compile(EMAIL_FORMAT_REGEXP).matcher(email).matches();
    }
}
