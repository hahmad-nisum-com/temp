package com.boilerplate.common.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AuthProvider {
    APPLE("apple"),
    FACEBOOK("facebook"),
    GOOGLE("google"),
    LOCAL("local");

    @JsonValue
    public final String value;

    AuthProvider(String value) {
        this.value = value;
    }
}


