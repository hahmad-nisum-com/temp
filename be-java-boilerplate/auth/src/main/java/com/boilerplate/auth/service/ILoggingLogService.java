package com.boilerplate.auth.service;

public interface ILoggingLogService {

    void recordAndHandleFailedLogin(String email);
    void clearFailedLoginAttempts(String email);
    boolean isBlocked(String email);
}
