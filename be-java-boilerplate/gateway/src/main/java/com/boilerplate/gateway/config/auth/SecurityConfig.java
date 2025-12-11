package com.boilerplate.gateway.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

import static com.boilerplate.gateway.utilities.Constants.SUPERADMIN;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityContextRepository securityContextRepository;

    @Autowired
    private SecurityFilter securityFilter;

    /**
     * Summary: Security Authorization.
     *
     * @param http http
     * @return SecurityWebFilterChain
     */
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                .exceptionHandling()
                .authenticationEntryPoint((swe, e) ->
                        Mono.fromRunnable(() -> swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED))
                ).accessDeniedHandler((swe, e) ->
                        Mono.fromRunnable(() -> swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN))
                ).and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilterBefore(securityFilter, SecurityWebFiltersOrder.AUTHORIZATION)
                .authenticationManager(authenticationManager)
                .securityContextRepository(securityContextRepository)
                .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                .pathMatchers("/swagger-resources", "/swagger-resources/configuration/ui", "/swagger-resources/configuration/security", "/swagger-ui/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/service/**").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/password/**").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/v1/users/**").permitAll()
                .pathMatchers(HttpMethod.PATCH, "/api/v1/users/**").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                .pathMatchers("/api/v1/admin/**").hasAuthority(SUPERADMIN)

                .anyExchange()
                .authenticated()
                .and()
                .build();
    }
}
