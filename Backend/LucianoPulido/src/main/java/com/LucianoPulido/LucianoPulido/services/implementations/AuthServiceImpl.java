package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.SessionRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.security.TokenException;
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

    @Autowired
    AuthenticationManager authenticationManager;
    
    @Override
    public Session login(String email, String password, Boolean keepLoggedIn) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        User user = userService.findByEmail(email);
        Session session = createSession(user, keepLoggedIn);
        return session;
    }

    @Override
    public Session register(User user) {
        user = userService.save(user);
        Session session = createSession(user, false);
        return session;
    }

    @Override
    public Session refresh(String authorizationHeader) throws TokenException{
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            throw new TokenException("The authorization header is missing or does not have the Bearer prefix");
        }

        String token = authorizationHeader.substring(7);
        Session session = sessionRepository.findById(token).orElseThrow(() -> new TokenException("Refresh token not found"));
        jwtService.validateToken(token, session.getUser());
        
        Session newSession = createSession(session.getUser(), session.getKeepLoggedIn());
        sessionRepository.delete(session);
        return newSession;
    }

    private Session createSession(User user, Boolean keepLoggedIn){
        String accessToken = jwtService.createAccessToken(user);
        String refreshToken = jwtService.createRefreshToken(user, keepLoggedIn);
        Session session = new Session(accessToken, refreshToken, new Date(System.currentTimeMillis()), keepLoggedIn, user);
        sessionRepository.save(session);
        return session;
    }
}