package com.LucianoPulido.LucianoPulido.services.interfaces;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;

public interface AuthService {
    Session register(User user);
    Session login(String email, String password);
    Session refresh(User user);
}
