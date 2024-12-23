package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.JwtAuthResponse;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.LoginDTO;
import com.LucianoPulido.LucianoPulido.services.interfaces.AuthService;

@RestController
@RequestMapping("/")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDTO loginDto){
        Map<String, Object> token = authService.login(loginDto.getEmail(), loginDto.getPassword());

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken((String) token.get("token"));
        jwtAuthResponse.setUsername((String) token.get("username"));
        jwtAuthResponse.setIsAdmin((Boolean) token.get("isAdmin"));
        
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

}
