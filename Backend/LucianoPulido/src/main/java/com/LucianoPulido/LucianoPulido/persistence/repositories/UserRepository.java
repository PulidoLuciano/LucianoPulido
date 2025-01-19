package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface UserRepository extends GenericRepository<User, UUID>, CrudRepository<User, UUID>{

    Optional<User> findByEmail(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM users LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<User> findWithPagination(@Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT COUNT(id) FROM users WHERE send_emails=true", nativeQuery = true)
    public Long countSuscribe();

    @Query(value = "SELECT * FROM users WHERE LOWER(username) LIKE :searchRegex", nativeQuery = true)
    public Set<User> searchUsersByUsername(@Param("searchRegex") String searchRegex);
}
