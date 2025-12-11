package com.boilerplate.user.customvalidation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Slf4j
public class DuplicateValueValidatorImpl implements ConstraintValidator<IDuplicateValueValidator, Object> {

    private String field;
    private Class<?> classType = null;

    @Autowired
    private ApplicationContext context;
    private Object instance;

    @Override
    public void initialize(IDuplicateValueValidator constraintAnnotation) {

        String entity;
        if (constraintAnnotation != null) {
            entity = constraintAnnotation.className();
            field = constraintAnnotation.field();
            try {
                classType = Class.forName("com.boilerplate.modules.user.repository." + entity + "Repository");
                instance = context.getBean(classType);

            } catch (ClassNotFoundException e) {
                log.error("Class not found: {}", e.getLocalizedMessage());
            }
        }
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {

        boolean result;
        if (value == null) {
            return true;
        }
        try {
            Object object = classType.getMethod("findBy" + field, Object.class).invoke(instance, value);
            result = object != Optional.empty();
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            return false;
        }
        return result;
    }
}