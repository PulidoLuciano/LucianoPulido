package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.JwtAuthResponse;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.LoginDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.UserMapper;
import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.services.interfaces.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register(@Validated @RequestBody UserDTO userDto){
        User user = userMapper.toEntity(userDto);
        Session session = authService.register(user);
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setUsername(session.getUser().getUsername());
        jwtAuthResponse.setIsAdmin(session.getUser().getIsAdmin());
        jwtAuthResponse.setAccessToken(session.getAccessToken());
        jwtAuthResponse.setRefreshToken(session.getToken());
        jwtAuthResponse.setTokenType("Bearer");
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDTO loginDto){
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthResponse> refresh(@RequestBody LoginDTO loginDto){
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

}
