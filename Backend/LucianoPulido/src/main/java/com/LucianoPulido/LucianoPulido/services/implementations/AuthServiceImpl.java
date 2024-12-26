package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.SessionRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.services.interfaces.AuthService;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    SessionRepository sessionRepository;
    
    @Override
    public Session login(String email, String password) {
        return null;
    }

    @Override
    public Session register(User user) {
        user = userService.save(user);
        String accessToken = jwtService.createAccessToken(user);
        String refreshToken = jwtService.createRefreshToken(user, false);
        Session session = new Session(refreshToken, new Date(System.currentTimeMillis()), user, accessToken);
        sessionRepository.save(session);
        return session;
    }

    @Override
    public Session refresh(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'refresh'");
    }
}