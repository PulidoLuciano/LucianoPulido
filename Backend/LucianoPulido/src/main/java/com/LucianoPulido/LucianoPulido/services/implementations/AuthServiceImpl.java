package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.UserRepository;
import com.LucianoPulido.LucianoPulido.security.JwtTokenProvider;
import com.LucianoPulido.LucianoPulido.services.interfaces.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository usuariosRepository;

    @Override
    public Map<String, Object> login(String email, String password) {

        UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = authenticationManager.authenticate(upat);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = usuariosRepository.findById(email).get();
        String token = jwtTokenProvider.generateToken(authentication, user);

        Map<String, Object> claims = Map.of("token", token, "username", user.getUsername(), "isAdmin", user.getIsAdmin());
        return claims;
    }
}