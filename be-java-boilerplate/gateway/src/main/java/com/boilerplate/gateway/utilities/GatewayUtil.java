package com.boilerplate.gateway.utilities;

import static com.boilerplate.gateway.utilities.Constants.USERNAME;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import javax.annotation.PostConstruct;
import java.security.Key;

@Slf4j
@Component
@RequiredArgsConstructor
public class GatewayUtil {

    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * Check token Authenticity by parsing it with the public key.
     *
     * @param token Token for which the authenticity needed to be checked.
     * @return Claims after authenticity is checked successfully, otherwise relevant exception will be thrown.
     */
    public Jws<Claims> checkAuthenticity(String token) {
        try {
            checkAccessTokenValidity(token);
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
        } catch (ExpiredJwtException exception) {
            log.error("Token Expire Exception: {}", exception.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USERNAME + getUsername(token)
                    + " expired token is passed. Token: " + token, exception);
        } catch (SignatureException exception) {
            log.error(USERNAME + getUsername(token) + " either public key is not configured correctly for token "
                    + "OR token is signed with some other key which is not valid as per the public key for token");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USERNAME + getUsername(token)
                    + " invalid signed token is passed. Token: " + token, exception);
        } catch (UnsupportedJwtException | MalformedJwtException exception) {
            log.error("Unsupported Jwt Exception: {}", exception.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USERNAME + getUsername(token)
                    + " bad token is passed. Token: " + token, exception);
        } catch (Exception exception) {
            log.error("Exception While Checking Token Authenticity: {}", exception.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USERNAME + getUsername(token)
                    + " bad token is passed and unexpected exception has occurred. Token: " + token, exception);
        }
    }


    public void checkAccessTokenValidity(String accessToken) {
        if(!redisTemplate.hasKey(accessToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access token is either invalid or has been revoked. Token: " + accessToken);
        }
    }

    /**
     * Return Claims from Jws-Claims.
     *
     * @param claimsJws Jws claims object for which claims will be extracted.
     *                  This shouldn't be NULL otherwise NullPointerException will be thrown.
     * @return Extracted claims from Jws Claims.
     */
    public Claims getAllClaims(Jws<Claims> claimsJws) {
        return claimsJws.getBody();
    }

    private String getUsername(String token) {
        DecodedJWT decodedJWT = getDecodedJWT(token);
        log.info("Getting {} from token", "username");
        String preferredUsername = decodedJWT.getClaim("username").asString();
        log.info("{}: ", preferredUsername);
        return preferredUsername;
    }

    /**
     * Decode token.
     *
     * @param token Token to be decoded.
     * @return DecodedJWT.
     */
    public DecodedJWT getDecodedJWT(String token) {
        try {
            return JWT.decode(token);
        } catch (JWTDecodeException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad token is passed: " + token);
        }
    }

    /**
     * Get Token from ServerWebExchange object.
     *
     * @param exchange ServerWebExchange object.
     * @return Extracted token value in String.
     */
    public String getAuthorizationToken(ServerWebExchange exchange) {
        return getAuthorizationToken(exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION));
    }

    /**
     * Get Token from Authorization Header Value, and assuming it should be in the format "Bearer someToken".
     *
     * @param authorizationHeaderValue Authorization Header Value.
     * @return Extracted token value in String.
     */
    public String getAuthorizationToken(String authorizationHeaderValue) {
        if (!isBearerTokenValid(authorizationHeaderValue)) {
            log.error("Token is not valid, either its null OR empty OR only contain whitespace OR not having valid format as {Bearer + SPACE + token}");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid format of token: " + authorizationHeaderValue);
        }
        return authorizationHeaderValue.replace(Constants.AUTHORIZATION_TOKEN_PREFIX, "");
    }

    private boolean isBearerTokenValid(String authorizationHeaderValue) {
        return StringUtils.hasText(authorizationHeaderValue)
                && authorizationHeaderValue.startsWith(Constants.AUTHORIZATION_TOKEN_PREFIX);
    }
}
