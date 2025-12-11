package com.boilerplate.notification.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    /**
     * Logs the start of a method.
     *
     * @param joinPoint the join point representing the method being invoked
     */
    @Before("execution(* com.boilerplate.notification..*(..))")
    public void logMethodStart(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        log.info("Method {}::{} started.", className, methodName);
    }

    /**
     * Logs the end of a method.
     *
     * @param joinPoint the join point representing the method being invoked
     */
    @After("execution(* com.boilerplate.notification..*(..))")
    public void logMethodEnd(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        log.info("Method {}::{} ended.", className, methodName);
    }
}
