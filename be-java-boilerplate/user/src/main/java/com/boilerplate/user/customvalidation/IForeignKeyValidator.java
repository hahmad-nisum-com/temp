package com.boilerplate.user.customvalidation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ForeignKeyValidatorImpl.class)
@Target({ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface IForeignKeyValidator {

    //error message

    /**
     * message.
     */
    String message() default "";

    /**
     * className.
     */
    String className();

    /**
     * moduleName.
     */
    String moduleName();

    /**
     * type.
     */
    String type() default "Object";

    //represents group of constraints

    /**
     * groups.
     */
    Class<?>[] groups() default {};

    //represents additional information about annotation

    /**
     * payload.
     */
    Class<? extends Payload>[] payload() default {};
}
