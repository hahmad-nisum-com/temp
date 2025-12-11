package com.boilerplate.user.services.impl;

import com.boilerplate.common.customexception.NotFoundException;
import com.boilerplate.user.entity.UserRole;
import com.boilerplate.user.repository.UserRoleRepository;
import com.boilerplate.user.services.IUserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRoleService implements IUserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRole getRoleByName(String roleName) {
        return Optional.ofNullable(userRoleRepository.findByName(roleName))
                .orElseThrow(() -> new NotFoundException("User Role Not found"));
    }
}
