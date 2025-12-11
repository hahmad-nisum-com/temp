package com.boilerplate.common.config;

import static com.boilerplate.common.utilities.Constants.FOREIGN_KEY_CONSTRAINT_PATTERN;
import static com.boilerplate.common.utilities.Constants.UNIQUE_CONSTRAINT_PATTERN;

import com.boilerplate.common.customexception.*;
import com.boilerplate.common.model.response.ExceptionResponse;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Summary :: For custom error handling.This method will catch any type of Java exceptions that get thrown.
     *
     * @param ex exception
     * @return ResponseEntity Object
     */
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex) {
        Set<String> details = new HashSet<>();
        if (ex.getCause() != null) {
            details.add(ex.getCause().getMessage());
        } else {
            details.add(ex.getLocalizedMessage());
        }

        ExceptionResponse exceptionResponse = ExceptionResponse.builder().status(false)
                .message(details.iterator().next()).details(details).build();
        logErrors("Handle All Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponse);
    }

    /**
     * Summary :: For custom error handling.This method will catch all errors related to db constraint exception.
     *
     * @param ex exception
     * @return ResponseEntity Object
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public final ResponseEntity<Object> handleDataExceptions(DataIntegrityViolationException ex) {
        Throwable rootCause = getRootCause(ex);
        String detailMessage = (rootCause != null) ? rootCause.getMessage() : ex.getMessage();
        String message = resolveConstraintViolationMessage(detailMessage);

        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .status(false)
                .message(message)
                .details(detailMessage)
                .build();

        logErrors("Handle Data Integrity Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionResponse);
    }

    /**
     * handleEmployeeExceptions.
     *
     * @param ex BusinessException
     * @return ResponseEntity
     */
    @ExceptionHandler(BusinessException.class)
    public final ResponseEntity<Object> handleEmployeeExceptions(BusinessException ex) {
        Set<String> details = getExceptionMessage(ex);
        ExceptionResponse exceptionResponse = ExceptionResponse.builder().status(false).message(details.iterator().next()).build();
        exceptionResponse.setDetails(ex.getCustomObject() != null ? ex.getCustomObject() : details);
        logErrors("Business Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }

    /**
     * handleNotFoundExceptions.
     *
     * @param ex NotFoundException
     * @return ResponseEntity
     */
    @ExceptionHandler({NotFoundException.class, EmptyResultDataAccessException.class})
    public final ResponseEntity<Object> handleNotFoundExceptions(NotFoundException ex) {
        Set<String> details = getExceptionMessage(ex);
        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .status(false)
                .message(details.iterator().next())
                .details(details).build();
        logErrors("Handle Not Found Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponse);
    }

    /**
     * handleBadRequestExceptions.
     *
     * @param ex BadRequestException
     * @return ResponseEntity
     */
    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<Object> handleBadRequestExceptions(BadRequestException ex) {
        Set<String> details = getExceptionMessage(ex);
        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .status(false)
                .message(details.iterator().next())
                .details(details).build();
        logErrors("Handle Bad Request Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }

    /**
     * handleBadCredentialsExceptions.
     *
     * @param ex BadCredentialsException
     * @return ResponseEntity
     */
    @ExceptionHandler(BadCredentialsException.class)
    public final ResponseEntity<Object> handleBadCredentialsExceptions(BadCredentialsException ex) {
        Set<String> details= getExceptionMessage(ex);
        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .status(false)
                .message(details.iterator().next())
                .details(details)
                .build();
        logErrors("Handle Bad Credentials Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exceptionResponse);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        Set<String> details = getExceptionMessage(ex);
        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .status(false).message(details.iterator().next()).details(details)
                .build();
        logErrors("Handle Type Mismatch Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        Set<String> details = new HashSet<>();
        Set<String> invalidFields = new HashSet<>();
        StringBuilder message = new StringBuilder("Validation Error on ( ");
        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            if (ex.getCause() != null) {
                details.add(ex.getCause().getMessage());
            } else {
                details.add(error.getDefaultMessage());
                DefaultMessageSourceResolvable resolvable = (DefaultMessageSourceResolvable)
                        Objects.requireNonNull(error.getArguments())[0];
                invalidFields.add(resolvable.getDefaultMessage());
            }
            log.error("Handle Method Argument Not Valid Exception :" + error.getDefaultMessage());
        }
        message.append(String.join(", ", invalidFields));
        message.append(" )");
        ExceptionResponse exceptionResponse = ExceptionResponse.builder().status(false)
                .message(String.valueOf(message)).details(details).build();
        logErrors("Handle Method Argument Not Valid Exception: {}", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }

    private Set<String> getExceptionMessage(Exception ex) {
        Set<String> details = new HashSet<>();
        details.add(ex.getCause() != null ? ex.getCause().getMessage() : ex.getLocalizedMessage());
        return details;
    }

    private Throwable getRootCause(Throwable throwable) {
        Throwable cause = throwable;
        while (cause.getCause() != null && cause.getCause() != cause) {
            cause = cause.getCause();
        }
        return cause;
    }

    private String resolveConstraintViolationMessage(String detailMessage) {
        if (detailMessage == null) return "A data integrity violation occurred.";

        List<Function<String, String>> resolvers = List.of(
                this::resolveUniqueConstraint,
                this::resolveForeignKeyViolation,
                this::resolveDataTruncation,
                this::resolveNotNullViolation,
                this::resolveOutOfRangeValue,
                this::resolveGenericDuplicateKey
        );

        return resolvers.stream()
                .map(fn -> fn.apply(detailMessage))
                .filter(Objects::nonNull)
                .findFirst()
                .orElse("A data integrity violation occurred.");
    }

    private String resolveUniqueConstraint(String msg) {
        Matcher m = UNIQUE_CONSTRAINT_PATTERN.matcher(msg);
        return m.find()
                ? String.format("Duplicate entry for %s: %s. Please use a different %s",
                m.group(2), m.group(3), m.group(2))
                : null;
    }

    private String resolveForeignKeyViolation(String msg) {
        if (!msg.contains("foreign key constraint fails")) return null;
        Matcher m = FOREIGN_KEY_CONSTRAINT_PATTERN.matcher(msg);
        return m.find()
                ? String.format("Invalid value for %s: %s.", m.group(3), m.group(4))
                : "Invalid reference to a related entity. Check foreign key values.";
    }

    private String resolveDataTruncation(String msg) {
        Matcher m = Pattern.compile("Data too long for column '(.*?)'").matcher(msg);
        return m.find()
                ? String.format("Field '%s' is too long. Please shorten the input.", m.group(1))
                : null;
    }

    private String resolveNotNullViolation(String msg) {
        Matcher m = Pattern.compile("Column '(.*?)' cannot be null").matcher(msg);
        return m.find()
                ? String.format("Field '%s' is required and cannot be null.", m.group(1))
                : null;
    }

    private String resolveOutOfRangeValue(String msg) {
        Matcher m = Pattern.compile("Out of range value for column '(.*?)'").matcher(msg);
        return m.find()
                ? String.format("Value too large for field '%s'. Please provide a smaller value.", m.group(1))
                : null;
    }

    private String resolveGenericDuplicateKey(String msg) {
        Matcher m = Pattern.compile("Duplicate entry '(.*?)' for key '(.*?)'").matcher(msg);
        return m.find()
                ? String.format("Duplicate entry for '%s'. Please provide other value.", m.group(2))
                : null;
    }

    private void logErrors(String message, Exception ex) {
        log.error(message, ex.getLocalizedMessage(), ex);
    }
}
