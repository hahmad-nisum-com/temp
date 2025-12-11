package com.boilerplate.notification.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "mail")
public class EmailConfig {

    private List<SenderProperties> senders;

    @Getter
    @Setter
    public static class SenderProperties {

        private String name;
        private String host;
        private int port;
        private String username;
        private String password;
    }
}
