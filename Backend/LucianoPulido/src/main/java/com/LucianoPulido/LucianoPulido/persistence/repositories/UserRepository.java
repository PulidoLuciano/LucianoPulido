package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.UUID;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

public interface UserRepository extends GenericRepository<User, UUID>{
}
