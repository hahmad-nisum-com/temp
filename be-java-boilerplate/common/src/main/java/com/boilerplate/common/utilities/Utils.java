package com.boilerplate.common.utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.boilerplate.common.model.response.UserDetail;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;

@Component
public class Utils {

    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * decodeJwt.
     *
     * @param request String
     * @return object Object
     */
    public UserDetail decodeJwt(HttpServletRequest request) throws JsonProcessingException {
        String token = request.getHeader("Authorization");
        if (token != null) {
            token = token.replace("Bearer ", "");
            String[] splitString = token.split("\\.");
            String base64EncodedBody = splitString[1];
            String body = new String(Base64.getDecoder().decode(base64EncodedBody));
            return mapper.readValue(body, UserDetail.class);
        }
        return null;
    }
}
