package com.LucianoPulido.LucianoPulido.persistence.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface UserRepository extends GenericRepository<User, String>, CrudRepository<User, String>{
}
