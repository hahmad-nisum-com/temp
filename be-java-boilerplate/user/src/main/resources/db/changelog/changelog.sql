-- liquibase formatted sql

-- changeset Bilal:1
CREATE TABLE user_role
(
    id   BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid    VARCHAR(100) NOT NULL UNIQUE,
    user_name    VARCHAR(255) NOT NULL,
    user_role_id BIGINT  NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    password     VARCHAR(255) NOT NULL,
    country_code VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) UNIQUE,
    iso_country VARCHAR(5) NOT NULL,
    profile_picture_id VARCHAR(45) DEFAULT NULL,
    is_active    BOOLEAN DEFAULT TRUE,
    created_at   DATETIME,
    created_by   BIGINT,
    updated_at   DATETIME,
    updated_by   BIGINT,
    FOREIGN KEY (user_role_id) REFERENCES user_role (id)

);

CREATE TABLE user_auth_provider
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    auth_provider_id VARCHAR(255) DEFAULT NULL,
    auth_provider_name VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    created_at   DATETIME,
    created_by   BIGINT,
    updated_at   DATETIME,
    updated_by   BIGINT,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO user_role (id, name) VALUES
(1, 'System User'),
(2, 'Super Admin');


CREATE TABLE password_reset_token
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiry_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- changeset Bilal:2

ALTER TABLE user ADD COLUMN first_name VARCHAR(50);
ALTER TABLE user ADD COLUMN last_name VARCHAR(50);
ALTER TABLE user ADD COLUMN is_password_set BOOLEAN;


-- changeset Hassan:3
ALTER TABLE password_reset_token DROP COLUMN is_active;

--changeset Hassan:4
CREATE TABLE logging_log
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    total_failed_attempts INT NOT NULL DEFAULT 0,
    last_failed_attempt_time DATETIME
);

ALTER TABLE user ADD COLUMN is_block BOOLEAN;

-- changeset Bilal:5
ALTER TABLE user DROP COLUMN is_block;

ALTER TABLE user ADD COLUMN account_status ENUM('BLOCKED', 'TEMP_BLOCKED', 'ACTIVE') DEFAULT 'ACTIVE';
ALTER TABLE user DROP COLUMN is_active;

--changeset Hassan: 6
ALTER TABLE user MODIFY password VARCHAR(255) NULL;

--changeset Hassan: 7

ALTER TABLE user MODIFY country_code VARCHAR(255) NULL;
ALTER TABLE user MODIFY iso_country VARCHAR(5) NULL;
ALTER TABLE user MODIFY phone_number VARCHAR(255) NULL;
ALTER TABLE user ADD COLUMN is_profile_complete BOOLEAN NOT NULL;
ALTER TABLE user MODIFY is_password_set BOOLEAN NOT NULL;


--changeset Hassan: 8
CREATE TABLE user_refresh_token
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL UNIQUE,
    user_agent VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    created_date DATETIME,
    expiry_date DATETIME,
    revoked BOOLEAN NOT NULL DEFAULT FALSE
);

--changeset Hassan: 9
ALTER TABLE user_refresh_token MODIFY refresh_token VARCHAR(512) NOT NULL;

--changeset Hassan: 10
ALTER TABLE user_refresh_token MODIFY refresh_token VARCHAR(768) NOT NULL;

--changeset Mudassar: 1
ALTER TABLE user
    MODIFY COLUMN account_status ENUM('BLOCKED', 'TEMP_BLOCKED', 'ACTIVE', 'INACTIVE')
    DEFAULT 'ACTIVE';

--changeset Hassan: 11
CREATE TABLE conversations
(
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    participant1_id CHAR(36) NOT NULL,
    participant2_id CHAR(36) NOT NULL,
    property_id     BIGINT,
    created_at      DATETIME,
    created_by      BIGINT,
    updated_at      DATETIME,
    updated_by      BIGINT,
    UNIQUE (participant1_id, participant2_id, property_id)
);
CREATE TABLE message
(
    id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id             BIGINT   NOT NULL,
    sender_id                   CHAR(36) NOT NULL,
    receiver_id                 CHAR(36) NOT NULL,
    message_text                TEXT,
    send_at                     DATETIME,
    message_status ENUM('READ', 'SENT', 'DELIVERED') DEFAULT 'SENT',
    FOREIGN KEY (conversation_id) REFERENCES conversations (id)
);

CREATE TABLE alert_notification
(
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    message                 TEXT        NOT NULL,
    user_id                 CHAR(36) NOT NULL,
    alert_notification_type ENUM('NEW_CHAT', 'ACCOUNT_WARNING', 'NEW_MESSAGE') NOT NULL,
    reference_id            BIGINT,
    is_read                 BOOLEAN DEFAULT FALSE,
    created_at              DATETIME,
    created_by              BIGINT,
    updated_at              DATETIME,
    updated_by              BIGINT
);

--changeset Mudassar: 2
ALTER TABLE user ADD COLUMN subscribed_to_promotions BOOLEAN DEFAULT TRUE;