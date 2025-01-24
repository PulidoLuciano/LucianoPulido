package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.SessionRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.security.TokenException;
import com.LucianoPulido.LucianoPulido.services.interfaces.AuthService;
import com.LucianoPulido.LucianoPulido.services.interfaces.EmailService;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

import jakarta.mail.MessagingException;

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

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Override
    public Session login(String email, String password, Boolean keepLoggedIn) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        User user = userService.findByEmail(email);
        if(!user.getIsVerified()) throw new IllegalArgumentException("User is not verified");
        Session session = createSession(user, keepLoggedIn);
        return session;
    }

    @Override
    public User register(User user) throws MessagingException{
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userService.save(user);
        String verifyToken = jwtService.createRefreshToken(user, true);
        emailService.sendWelcomeEmail(user, verifyToken);
        return user;
    }

    @Override
    public Session refresh(String authorizationHeader) throws TokenException{
        Session session = validateRefreshToken(authorizationHeader);
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

    @Override
    public void logout(String authorizationHeader) throws TokenException {
        Session session = validateRefreshToken(authorizationHeader);
        sessionRepository.delete(session);
    }

    private Session validateRefreshToken(String authorizationHeader) throws TokenException{
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            throw new TokenException("The authorization header is missing or does not have the Bearer prefix");
        }

        String token = authorizationHeader.substring(7);
        Session session = sessionRepository.findById(token).orElseThrow(() -> new TokenException("Refresh token not found"));
        jwtService.validateToken(token, session.getUser());

        return session;
    }

    @Override
    public User verifyAccount(String token){
        if(token == null || token.trim() == "") throw new IllegalArgumentException("Token is null or empty");
        UUID userId = jwtService.extractUserId(token);
        User user = userService.getById(userId).orElseThrow(() -> new IllegalArgumentException("The user does not exist"));
        user.setIsVerified(true);
        user = userService.save(user);
        return user;
    }
}