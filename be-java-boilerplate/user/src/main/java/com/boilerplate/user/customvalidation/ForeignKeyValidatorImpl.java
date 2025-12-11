package com.boilerplate.user.customvalidation;

import com.boilerplate.common.dto.RelationDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
public class ForeignKeyValidatorImpl implements ConstraintValidator<IForeignKeyValidator, Object> {

    private String type;
    private Class<?> classType = null;
    private Object instance;

    @Autowired
    private ApplicationContext context;

    @Override
    public void initialize(IForeignKeyValidator constraintAnnotation) {
        if (constraintAnnotation != null) {
            String entity = constraintAnnotation.className();
            type = constraintAnnotation.type();
            String moduleName = constraintAnnotation.moduleName();
            try {
                classType = Class.forName("com.boilerplate." + moduleName + ".repository." + entity + "Repository");
                instance = context.getBean(classType);

            } catch (ClassNotFoundException e) {
                log.error("Class Not Found: {}", e.getLocalizedMessage());
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
            if (type.equals("List")) {
                result = isListValid(value);
            } else if (type.equals("Object")) {
                RelationDto id = (RelationDto) value;
                Object object = classType.getMethod("findById", Object.class).invoke(instance, id.getId());
                result = object != Optional.empty();
            } else {
                Object object = classType.getMethod("findById", Object.class).invoke(instance, value);
                result = object != Optional.empty();
            }
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            return false;
        }
        return result;
    }

    private boolean isListValid(Object obj) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<RelationDto> dtos = (List<RelationDto>) obj;
        List<Long> ids = new ArrayList<>();
        for (RelationDto dto : dtos) {
            ids.add(dto.getId());
        }
        ids = ids.stream().distinct().toList();
        List<Object> objects = (List<Object>) classType.getMethod("findAllByIdIn", List.class).invoke(instance, ids);

        return objects.size() == ids.size();
    }
}

