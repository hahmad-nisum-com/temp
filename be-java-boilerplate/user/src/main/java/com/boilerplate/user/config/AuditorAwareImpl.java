package com.boilerplate.user.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.boilerplate.common.customexception.BusinessException;
import com.boilerplate.common.model.response.UserDetail;
import com.boilerplate.common.utilities.Utils;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class AuditorAwareImpl implements AuditorAware<Long> {

    @Autowired
    private Utils utils;

    @Override
    public Optional<Long> getCurrentAuditor() {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            return Optional.empty();
        }
        HttpServletRequest request = attributes.getRequest();
        UserDetail loggedInUser;
        try {
            loggedInUser = utils.decodeJwt(request);
        } catch (JsonProcessingException e) {
            throw new BusinessException("Error decoding JWT: " + e.getMessage(), e);
        }
        if (null == loggedInUser) {
            return Optional.empty();
        }
        return Optional.ofNullable(loggedInUser.getId());
    }
}
