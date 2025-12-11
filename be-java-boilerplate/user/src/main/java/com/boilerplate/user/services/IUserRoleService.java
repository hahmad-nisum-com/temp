package com.boilerplate.user.services;

import com.boilerplate.user.entity.UserRole;

public interface IUserRoleService {

    UserRole getRoleByName(String roleName);
}
