package com.boilerplate.auth.config;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.AUTH;

import com.boilerplate.auth.jwt.AuthEntryPointJwt;
import com.boilerplate.auth.jwt.AuthTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

  public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler) {
    this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
  }

  @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * filterChain.
     *
     * @param http              HttpSecurity
     * @param authEntryPointJwt AuthEntryPointJwt
     * @return http .
     * @throws Exception Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthEntryPointJwt authEntryPointJwt) throws Exception {
        http.cors().and().csrf().disable()
            .exceptionHandling().authenticationEntryPoint(authEntryPointJwt).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests(auth -> auth
                .antMatchers("/v2/api-docs", "/swagger-resources",
                    "/configuration/security", "/webjars/**",
                    "/swagger-resources/configuration/ui", "/swagger-resources/configuration/security",
                    "/swagger-ui/**", API + AUTH + "/**"
                ).permitAll()
                .anyRequest().authenticated())
                .oauth2Login(auth2 -> auth2.successHandler(customAuthenticationSuccessHandler)
                .failureUrl("/login?error"))
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .clearAuthentication(true));

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
