package com.boilerplate.notification.utilities;

import com.boilerplate.common.dto.EmailNotificationDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import javax.mail.internet.MimeMessage;

@Slf4j
@Component
@EnableAsync
public class EmailUtil {

    private final JavaMailSender mailSender;

    public EmailUtil(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * userNotificationTemplate.
     */
    @Async
    public void sendMail(EmailNotificationDto notificationDto) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(notificationDto.getSendTo());
            helper.setSubject(notificationDto.getTitle());
            helper.setText(notificationDto.getMessage(), true);
            helper.setFrom("demo@demomailtrap.co");
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
