package com.boilerplate.user.repository;

import com.boilerplate.user.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CustomRepository<User, Long>,
    JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUuid(String uuid);

    @Query("SELECT u FROM User u WHERE u.uuid IN :uuids")
    List<User> findByUuidIn(List<String> uuids);

    List<User> findBySubscribedToPromotionsTrue();

}
