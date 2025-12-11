package com.boilerplate.notification.service.impl;

import static com.boilerplate.common.enums.EmailSubject.ACCOUNT_CREATION_SUBJECT;
import static com.boilerplate.common.enums.EmailTemplate.ACCOUNT_CREATION;
import static com.boilerplate.common.enums.EmailType.PASSWORD_RESET;
import static com.boilerplate.common.enums.EmailType.WELCOME;

import com.boilerplate.common.dto.EmailNotificationDto;
import com.boilerplate.common.enums.EmailSubject;
import com.boilerplate.common.enums.EmailTemplate;
import com.boilerplate.common.enums.EmailType;
import com.boilerplate.notification.service.INotificationService;
import com.boilerplate.notification.service.IUserNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserNotificationService implements IUserNotificationService {

    private final INotificationService notificationService;

    @Override
    public void sendEmailNotification(EmailNotificationDto emailNotificationDto) {
        if (emailNotificationDto.getEmailType().equals(WELCOME)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.WELCOME.getTemplateName(),
                    EmailSubject.WELCOME_SUBJECT.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(PASSWORD_RESET)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.PASSWORD_RESET.getTemplateName(),
                    EmailSubject.PASSWORD_RESET.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.ACCOUNT_CREATION)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.ACCOUNT_CREATION.getTemplateName(),
                    EmailSubject.ACCOUNT_CREATION_SUBJECT.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.ACCOUNT_BLOCK)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.ACCOUNT_BLOCK.getTemplateName(),
                    EmailSubject.ACCOUNT_BLOCK_SUBJECT.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.USER_ACCOUNT_STATUS_UPDATE)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.USER_ACCOUNT_STATUS_UPDATE_TEMPLATE.getTemplateName(),
                    EmailSubject.USER_ACCOUNT_STATUS_UPDATE_SUBJECT.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.USER_ACCOUNT_CREATION_BY_ADMIN)) {
        notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.USER_ACCOUNT_LOGIN_INSTRUCTIONS.getTemplateName(),
                EmailSubject.USER_ACCOUNT_CREATION_LOGIN_INSTRUCTIONS.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.USER_ACCOUNT_UPDATE)) {
        notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.USER_ACCOUNT_UPDATE.getTemplateName(),
                EmailSubject.USER_ACCOUNT_DETAILS_UPDATE.getSubjectName());
        } else if (emailNotificationDto.getEmailType().equals(EmailType.PROMOTIONAL)) {
            notificationService.sendEmailNotification(emailNotificationDto, EmailTemplate.PROMOTIONAL_EMAILS.getTemplateName(),
                    EmailSubject.PROMOTIONAL_SUBJECT.getSubjectName());
        }



}
}
