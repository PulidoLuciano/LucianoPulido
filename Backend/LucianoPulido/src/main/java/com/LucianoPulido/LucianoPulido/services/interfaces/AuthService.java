package com.LucianoPulido.LucianoPulido.services.interfaces;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.security.TokenException;

public interface AuthService {
    Session register(User user);
    Session login(String email, String password, Boolean keepLoggedIn);
    Session refresh(String authorizationHeader) throws TokenException;
    void logout(String authorizationHeader) throws TokenException;
}
