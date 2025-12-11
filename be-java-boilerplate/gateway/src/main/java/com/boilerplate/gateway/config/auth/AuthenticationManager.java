package com.boilerplate.gateway.config.auth;

import com.boilerplate.gateway.utilities.GatewayUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@AllArgsConstructor
public class AuthenticationManager implements ReactiveAuthenticationManager {

    @Autowired
    private GatewayUtil gatewayUtil;

    @Override
    @SuppressWarnings("unchecked")
    public Mono<Authentication> authenticate(Authentication authentication) {

        String token = authentication.getCredentials().toString();
        log.debug("Auth-Token: {}", token);
        //Check Authenticity of token
        Jws<Claims> claimsJws = gatewayUtil.checkAuthenticity(token);
        //Get Claims from token
        Claims allClaimsFromToken = gatewayUtil.getAllClaims(claimsJws);
        return Mono
                .just(allClaimsFromToken)
                .map(claims -> {
                    List<Map<String,String>> authorities = claims.get("authorities", ArrayList.class);
                    List<String> roles = authorities.stream()
                            .map(x -> x.get("authority")).toList();
                    return new UsernamePasswordAuthenticationToken(
                            authentication.getPrincipal(), null, roles.stream().map(SimpleGrantedAuthority::new).toList());
                });
    }
}
