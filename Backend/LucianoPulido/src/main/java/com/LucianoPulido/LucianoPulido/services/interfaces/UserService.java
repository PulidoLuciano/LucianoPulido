package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Set;
import java.util.UUID;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.security.TokenException;
import com.LucianoPulido.LucianoPulido.services.base.GenericService;

public interface UserService extends GenericService<User, UUID>{

    User findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Long countSuscribe();

    Long count();

    Set<User> findWithPagination(int limit, int offset);

    Set<User> searchUserByUsername(String username);

    Set<User> getSuscribeUsers();

    User getMe(String authorizationHeader) throws TokenException;

    User editUser(String username, String email, String password, Boolean sendEmails, String currentPassword, String authorizationHeader) throws TokenException;
}
