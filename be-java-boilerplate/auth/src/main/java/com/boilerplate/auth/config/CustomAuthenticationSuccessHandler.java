package com.boilerplate.auth.config;

import static com.boilerplate.common.utilities.Constants.API;
import static com.boilerplate.common.utilities.Constants.AUTH;
import static com.boilerplate.common.utilities.Constants.AUTHENTICATION_DATA;
import static com.boilerplate.common.utilities.Constants.THIRD_PARTY_AUTHENTICATION_CALLBACK;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    request.getSession().setAttribute(AUTHENTICATION_DATA, authentication);
    response.sendRedirect(API + AUTH + THIRD_PARTY_AUTHENTICATION_CALLBACK);
  }
}
