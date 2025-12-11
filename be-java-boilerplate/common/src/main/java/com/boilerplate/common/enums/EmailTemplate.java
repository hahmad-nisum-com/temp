package com.boilerplate.common.enums;

public enum EmailTemplate {

    WELCOME("welcome-email"),
    PASSWORD_RESET("password-reset-email"),
    ACCOUNT_CREATION("account-creation"),
    ACCOUNT_BLOCK("account-block-email"),
    USER_ACCOUNT_STATUS_UPDATE_TEMPLATE("user-account-status-update"),
    USER_ACCOUNT_LOGIN_INSTRUCTIONS("Welcome-email-by-admin"),
    USER_ACCOUNT_UPDATE("user-account-update"),
    PROMOTIONAL_EMAILS("promotion");



    private final String template;

    // Constructor to assign the string value to each enum constant
    EmailTemplate(String template) {
        this.template = template;
    }

    // Getter method to access the string value
    public String getTemplateName() {
        return template;
    }
}
