package com.boilerplate.user.scheduler;

import com.boilerplate.user.services.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PromotionalEmailScheduler {

    private final UserService userService;

    @Scheduled(cron = "0 0 14 * * ?")
    public void sendPromotions() {
        userService.sendPromotionalEmails();
    }
}