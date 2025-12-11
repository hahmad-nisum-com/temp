package com.boilerplate.common.enums;

public enum EmailSubject {

    WELCOME_SUBJECT("You Are Welcome!"),
    PASSWORD_RESET("Password Reset Request"),
    ACCOUNT_CREATION_SUBJECT("Welcome! Your new account has been created"),
    ACCOUNT_BLOCK_SUBJECT("Account block status"),
    USER_ACCOUNT_STATUS_UPDATE_SUBJECT("Account Status Updated"),
    USER_ACCOUNT_CREATION_LOGIN_INSTRUCTIONS("Account Creation Login Instructions"),
    USER_ACCOUNT_DETAILS_UPDATE("Your Account Details Were Modified by Admin"),
    PROMOTIONAL_SUBJECT("You're Invited: Exclusive Deals Inside!");



    private final String subject;

    // Constructor to assign the string value to each enum constant
    EmailSubject(String subject) {
        this.subject = subject;
    }

    // Getter method to access the string value
    public String getSubjectName() {
        return subject;
    }
}
