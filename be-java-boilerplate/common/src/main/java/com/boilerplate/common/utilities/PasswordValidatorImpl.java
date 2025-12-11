package com.boilerplate.common.utilities;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidatorImpl implements ConstraintValidator<PasswordValidator, String> {

    /**
     * No initialization required since @PasswordValidator has no parameters.
     * This method is part of the ConstraintValidator lifecycle.
     */
    @Override
    public void initialize(PasswordValidator constraintAnnotation) {
        // no-op
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        // Skip validation if null or blank — handled by @NotBlank
        if (password == null || password.trim().isEmpty()) {
            return true;
        }
        String validationMessage = PasswordValidatorUtil.validatePassword(password);
        if (validationMessage == null) {
            return true;
        }
        return buildViolation(context, validationMessage);
    }

    private boolean buildViolation(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        return false;
    }
}

