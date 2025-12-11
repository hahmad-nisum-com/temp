package com.boilerplate.gateway.config.swagger;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import springfox.documentation.swagger.web.SwaggerResource;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ServiceDefinitionsContext {

    private final ConcurrentHashMap<String, String> serviceDescriptions;

    private ServiceDefinitionsContext() {
        serviceDescriptions = new ConcurrentHashMap<>();
    }

    public void addServiceDefinition(String serviceName, String serviceDescription) {
        serviceDescriptions.put(serviceName, serviceDescription);
    }

    public String getSwaggerDefinition(String serviceId) {
        return this.serviceDescriptions.get(serviceId);
    }

    /**
     * summary:: getSwaggerDefinitions.
     * @return SwaggerResource
     */
    public List<SwaggerResource> getSwaggerDefinitions() {
        return serviceDescriptions.keySet().stream().map(s -> {
            SwaggerResource resource = new SwaggerResource();
            resource.setLocation("/service/" + s);
            resource.setName(s);
            resource.setSwaggerVersion("2.0");
            return resource;
        }).toList();
    }
}
