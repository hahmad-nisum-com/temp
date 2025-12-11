package com.boilerplate.user.repository;

import com.boilerplate.user.entity.UserRole;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends CustomRepository<UserRole, Long> {
    UserRole findByName(String name);
}
