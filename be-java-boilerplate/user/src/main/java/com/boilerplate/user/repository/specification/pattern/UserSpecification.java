package com.boilerplate.user.repository.specification.pattern;

import com.boilerplate.common.enums.AccountStatus;
import com.boilerplate.user.entity.User;
import java.util.Objects;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

  public static Specification<User> searchByFirstNameOrLastNameOrEmail(String searchTerm) {
    return (root, query, cb) -> {
      if (StringUtils.isBlank(searchTerm)) {
        return cb.conjunction();
      }

      String likeTerm = "%" + searchTerm.toLowerCase() + "%";

      return cb.or(
          cb.like(cb.lower(root.get("firstName")), likeTerm),
          cb.like(cb.lower(root.get("lastName")), likeTerm),
          cb.like(cb.lower(root.get("email")), likeTerm)
      );
    };
  }

  public static Specification<User> withAccountStatus(AccountStatus status) {
    return (root, query, cb) ->
        Objects.isNull(status) ? cb.conjunction() : cb.equal(root.get("accountStatus"), status);
  }

  public static Specification<User> withUserRole(Long roleId) {
    return (root, query, cb) ->
        Objects.isNull(roleId) ? cb.conjunction() : cb.equal(root.get("userRole"), roleId);
  }
}

