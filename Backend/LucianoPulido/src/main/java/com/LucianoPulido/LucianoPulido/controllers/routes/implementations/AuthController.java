package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

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
import com.LucianoPulido.LucianoPulido.security.TokenException;
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
        JwtAuthResponse jwtAuthResponse = createJwtResponse(session);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDTO loginDto){
        Session session = authService.login(loginDto.getEmail(), loginDto.getPassword(), loginDto.getKeepLoggedIn());
        JwtAuthResponse jwtAuthResponse = createJwtResponse(session);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.CREATED);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthResponse> refresh(@RequestHeader("Authorization") String authorizationHeader) throws TokenException{
        Session session = authService.refresh(authorizationHeader);
        JwtAuthResponse jwtAuthResponse = createJwtResponse(session);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authorizationHeader) throws TokenException{
        authService.logout(authorizationHeader);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private JwtAuthResponse createJwtResponse(Session session){
        JwtAuthResponse jwtResponse = new JwtAuthResponse();
        jwtResponse.setUsername(session.getUser().getUsername());
        jwtResponse.setIsAdmin(session.getUser().getIsAdmin());
        jwtResponse.setAccessToken(session.getAccessToken());
        jwtResponse.setRefreshToken(session.getToken());
        jwtResponse.setTokenType("Bearer");
        return jwtResponse;
    }
}
