package com.LucianoPulido.LucianoPulido.services.interfaces;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.security.TokenException;

import jakarta.mail.MessagingException;

public interface AuthService {
    User register(User user) throws MessagingException;
    User verifyAccount(String token);
    void recoverPassword(String email) throws MessagingException;
    void changePassword(String token, String password);
    Session login(String email, String password, Boolean keepLoggedIn);
    Session refresh(String authorizationHeader) throws TokenException;
    void logout(String authorizationHeader) throws TokenException;
}
