package com.boilerplate.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import java.io.Serializable;

@NoRepositoryBean
public interface CustomRepository<T extends Object, I extends Serializable> extends JpaRepository<T, I> {
}
