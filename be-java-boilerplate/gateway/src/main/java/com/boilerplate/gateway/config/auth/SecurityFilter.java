package com.boilerplate.gateway.config.auth;

import static com.boilerplate.gateway.utilities.Constants.EMAIL;
import static com.boilerplate.gateway.utilities.Constants.USER_ID;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.boilerplate.gateway.utilities.GatewayUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import java.util.Objects;

@Slf4j
public class SecurityFilter implements WebFilter {

    @Autowired
    private GatewayUtil gatewayUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();
        if (request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
            //Assuming the request is other than login and forgot password.
            String token = gatewayUtil.getAuthorizationToken(exchange);
            request = getHttpHeaders(exchange, token);
        }
        return chain.filter(exchange.mutate().request(request).build());
    }

    private ServerHttpRequest getHttpHeaders(ServerWebExchange exchange, String token) {

        DecodedJWT jwt = gatewayUtil.getDecodedJWT(token);
        String username = jwt.getClaim(EMAIL).asString();
        Claim userId = jwt.getClaim(USER_ID);

        return exchange.getRequest().mutate()
                .header(EMAIL, Objects.toString(username, null))
                .header(USER_ID, Objects.toString(userId, null))
                .build();
    }
}
