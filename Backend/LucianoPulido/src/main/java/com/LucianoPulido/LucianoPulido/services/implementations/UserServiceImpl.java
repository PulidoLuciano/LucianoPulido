package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, UUID, UserRepository> implements UserService{
    
    public User save(User user){
        return super.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return super.getRepositorio().findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Override
    public boolean existsByUsername(String username) {
        return super.getRepositorio().existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return super.getRepositorio().existsByEmail(email);
    }

    @Override
    public Long countSuscribe() {
        return super.getRepositorio().countSuscribe();
    }

    @Override
    public Long count() {
        return super.getRepositorio().count();
    }

    @Override
    public Set<User> findWithPagination(int limit, int offset) {
        return super.getRepositorio().findWithPagination(limit, offset);
    }

    @Override
    public Set<User> searchUserByUsername(String username) {
        String regex = "%".concat(username.toLowerCase()).concat("%");
        return super.getRepositorio().searchUsersByUsername(regex);
    }

    @Override
    public Set<User> getSuscribeUsers() {
        return super.getRepositorio().findSuscribeUsers();
    }
}
