package com.boilerplate.auth.fallback;

import com.boilerplate.auth.externalservice.IUserService;
import com.boilerplate.auth.externalservice.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserServiceFallback implements FallbackFactory<IUserService> {

    @Override
    public IUserService create(Throwable cause) {
        log.error("An exception occurred when calling the UserService", cause);
        return new UserService();
    }
}
