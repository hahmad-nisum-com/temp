package com.boilerplate.auth.service;

import com.boilerplate.auth.externalservice.IUserService;
import com.boilerplate.common.dto.UserDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final IUserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return Optional.ofNullable(userService.getUserByEmail(username))
            .map(UserDetailsImpl::build)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found With Email: " + username));
    }
}
