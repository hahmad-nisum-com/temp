package com.boilerplate.auth.jwt;

import com.boilerplate.auth.model.response.JwtResponse;
import com.boilerplate.auth.service.UserDetailsImpl;
import com.boilerplate.common.utilities.ModelMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access.expiration}")
    private Long jwtAccessExpiration;

    @Value("${jwt.refresh.expiration}")
    private Long jwtRefreshExpiration;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public String getUserNameFromJwtToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public String getEmailFromJwtToken(String token) {
        return (String) getAllClaimsFromToken(token).get("email");
    }

    public Integer getIdFromJwtToken(String token) {
        return (Integer) getAllClaimsFromToken(token).get("id");
    }
    public UUID getUuidFromToken(String token) {
        return UUID.fromString((String) getAllClaimsFromToken(token).get("uuid"));
    }
    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    /**
     * generateJwtToken.
     *
     * @param userDetails authentication
     * @return String
     */
    public String generateJwtToken(UserDetailsImpl userDetails) {
        Map<String, Object> map = ModelMapper.convertToMap(userDetails);
        return createJwtToken(userDetails.getUsername(), map, new Date((new Date()).getTime() + jwtAccessExpiration));
    }

    public String generateRefreshToken(UserDetailsImpl userDetails) {
        Map<String, Object> map = ModelMapper.convertToMap(userDetails);
        return createJwtToken(userDetails.getUsername(), map, new Date((new Date()).getTime() + jwtRefreshExpiration));
    }

    public String createJwtToken(String userName, Map<String, Object> map, Date expirationDate ) {
        return Jwts.builder().setSubject(userName).addClaims(map)
            .setIssuedAt(new Date())
            .setExpiration(expirationDate)
            .signWith(key, SignatureAlgorithm.HS512).compact();
    }
    /**
     * validateJwtToken.
     *
     * @param token authToken
     * @return boolean
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    /**
     * Get authorities for token.
     *
     * @param token authToken
     * @return List
     */
    public String extractUserRole(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        List<Map<String, String>> authorities = claims.get("authorities", ArrayList.class);
        return Optional.ofNullable(authorities)
            .orElse(Collections.emptyList())
            .stream()
            .map(x -> x.get("authority"))
            .filter(Objects::nonNull)
            .findFirst().orElse(StringUtils.EMPTY);
    }

    /**
     * Get JwtResponse from token.
     *
     * @param accessToken authToken
     * @return JwtResponse
     */
    public JwtResponse getJwtResponse(String accessToken, String refreshToken , String userRole, long id, String uuid, String email) {
        return JwtResponse.builder().message("Token Generated").accessToken(accessToken).refreshToken(refreshToken).status(true)
                .userRole(userRole).id(id).uuid(UUID.fromString(uuid)).email(email).build();
    }




}
