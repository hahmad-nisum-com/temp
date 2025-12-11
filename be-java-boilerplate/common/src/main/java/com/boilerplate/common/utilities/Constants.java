package com.boilerplate.common.utilities;

import java.time.Duration;
import java.util.regex.Pattern;

public class Constants {

    private Constants() {
    }

    // Auth
    public static final String API = "/api";
    public static final String AUTH = "/v1/auth";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String THIRD_PARTY_AUTHENTICATION_CALLBACK = "/third-party-auth-callback";
    public static final String FORGOT_PASSWORD = "/forgot-password";
    public static final String UPDATE_PASSWORD = "/update-password";
    public static final String UPDATE_CURRENT_PASSWORD = "/update-current-password";
    public static final String REFRESH_TOKEN = "/refresh-token";
    public static final int MAX_FAILED_ATTEMPTS = 5;
    public static final int LAST_FAILED_ATTEMPT = 4;
    public static final Duration TEMP_BLOCK_DURATION = Duration.ofMinutes(15);

    // User
    public static final String USERS = "/v1/users";
    public static final String USER_BY_EMAIL = "/user-by-email";
    public static final String SAVE_USER = "/save-user";
    public static final String U_UID = "/{uuid}";
    public static final String PASSWORD = "/password";
    public static final String THIRD_PARTY_LOGIN = "/third-party-login";
    public static final String SEARCH_USERS = "/search-users";
    public static final String STATUS = "/status";
    public static final String USER_DEACTIVATED = "Your User Account Has Been Marked Inactive Due to Security Reason, "
            + "In Case of Queries Contact Our Support Team";
    public static final String USER_ACTIVE = "Your User Has Activated, Upon your Request";
    public static final String ACTIVATE_INACTIVATE_USER = "/activate-inactivate-user";
    public static final String UNSUBSCRIBE_PATH = "/unsubscribe-success.html?email=%s";

    // Admin
    public static final String ADMIN = "/v1/admin";

    public static final String EMAIL_FORMAT_REGEXP = "^[\\w-\\.]+(\\+\\w+)?@([\\w-]+\\.)+[\\w-]{2,4}$";
    public static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";

    // Exception
    public static final String SERVER_ERROR = "Server Error";
    public static final String USER_NOT_FOUND = "User not found";

    // WebSocket
    public static final String CONVERSATION= "/v1/conversation";
    public static final String WEBSOCKET = "/v1/websocket";
    public static final String SEND_NOTIFY = "/send-notify";
    public static final String SEND_CHAT_MESSAGE = "/send-chat-message";
    public static final String SEND_CHATS = "/send-chats";
    public static final String INITIATE_CHAT = "/initiate-chat";
    public static final String MESSAGES = "/messages";
    public static final String CHAT = "/chat";


    // Notification
    public static final String NOTIFICATION = "/v1/notification";
    public static final String NOTIFICATION_ID = "/{notificationId}";
    public static final String SEND_EMAIL = "/send-email";
    public static final String ALERT = "/alert";
    public static final String MARK_AS_READ = "/mark-as-read";

    //Token generation
    public static final long TOKEN_EXPIRATION_TIME = 24;

    //User Roles
    public static final String SUPER_ADMIN = "Super Admin";
    public static final String SYSTEM_USER = "System User";

    //Failed Login Attempts
    public static final String ACCOUNT_BLOCK_WARNING = "Email or Password Incorrect." +
            "Your account will be locked after one more failed attempt. ";
    public static final String ACCOUNT_BLOCKED = "Your account has been locked after too many failed attempts. " +
            "Please wait 15 minutes before trying again";


    //Auth Attribute
    public static final String AUTHENTICATION_DATA = "auth-data";
    public static final String USER_AGENT = "User-Agent";


    // Regex patterns to check for unique and foreign key constraint violations
    public static final Pattern UNIQUE_CONSTRAINT_PATTERN = Pattern.compile(
            "duplicate key value violates unique constraint \"(.*?)\"\\s+Detail: Key \\((.*?)\\)=\\((.*?)\\)"
    );
    public static final Pattern FOREIGN_KEY_CONSTRAINT_PATTERN = Pattern.compile(
            "table \"(.*?)\" violates foreign key constraint \"(.*?)\"\\s+Detail: "
                    + "Key \\((.*?)\\)=\\((.*?)\\) is not present in table \"(.*?)\"");

}
