package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, UUID, UserRepository> implements UserService{

    @Autowired
    PasswordEncoder passwordEncoder;
    
    public User save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
}
