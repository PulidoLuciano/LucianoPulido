package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Map;

public interface AuthService {
    Map<String, Object> login(String email, String password);
}
