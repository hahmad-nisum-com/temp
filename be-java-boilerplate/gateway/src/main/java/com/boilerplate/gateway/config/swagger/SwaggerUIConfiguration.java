package com.boilerplate.gateway.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.swagger.web.InMemorySwaggerResourcesProvider;
import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class SwaggerUIConfiguration {

    @Bean
    public RestTemplate configureTempalte() {
        return new RestTemplate();
    }

    /**
     * Summary :: Get list of swagger resource provider.
     *
     * @param defaultResourcesProvider defaultResourcesProvider
     * @param temp temp
     * @return SwaggerResourcesProvider
     */
    @Primary
    @Bean
    @Lazy
    public SwaggerResourcesProvider swaggerResourcesProvider(InMemorySwaggerResourcesProvider defaultResourcesProvider, RestTemplate temp, ServiceDefinitionsContext definitionContext) {
        return () -> {
            List<SwaggerResource> resources = new ArrayList<>(defaultResourcesProvider.get());
            resources.clear();
            resources.addAll(definitionContext.getSwaggerDefinitions());
            return resources;
        };
    }
}
