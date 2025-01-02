package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface UserRepository extends GenericRepository<User, UUID>, CrudRepository<User, UUID>{

    Optional<User> findByEmail(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
