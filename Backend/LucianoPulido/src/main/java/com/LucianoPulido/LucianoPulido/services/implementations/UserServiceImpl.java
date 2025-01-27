package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.security.TokenException;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, UUID, UserRepository> implements UserService{
    
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
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

    @Override
    public User getMe(String authorizationHeader) throws TokenException{
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            throw new TokenException("The authorization header is missing or does not have the Bearer prefix");
        }

        String token = authorizationHeader.substring(7);
        UUID userId = jwtService.extractUserId(token);
        return super.getById(userId).orElseThrow(() -> new TokenException("The user does not exist"));
    }

    @Override
    public User editUser(String username, String email, String password, Boolean sendEmails, String currentPassword,
            String authorizationHeader) throws TokenException {
        User originalUser = getMe(authorizationHeader);
        if(!passwordEncoder.matches(currentPassword, originalUser.getPassword())) throw new IllegalArgumentException("The current password is not correct");


        originalUser.setUsername(username);
        originalUser.setEmail(email);
        originalUser.setSendEmails(sendEmails);
        if(password.trim() != ""){
            originalUser.setPassword(passwordEncoder.encode(password));
        }
        originalUser = super.save(originalUser);
        return originalUser;
    }
}
