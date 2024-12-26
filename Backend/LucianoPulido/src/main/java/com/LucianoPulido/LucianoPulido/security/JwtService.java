package com.LucianoPulido.LucianoPulido.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration}")
    private long accessTokenExpiration;

    @Value("${app.jwt-refresh-expiration}")
    private long refreshTokenExpiration;

    public String createAccessToken(User user) {
        return createToken(user, accessTokenExpiration);
    }

    public String createRefreshToken(User user, Boolean keepLoggedIn) {
        long expirationTime = keepLoggedIn ? refreshTokenExpiration * 120 : refreshTokenExpiration;
        return createToken(user, expirationTime);
    }

    private String createToken(User user, long expiration) {
        return Jwts.builder().id(user.getId().toString()).subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration)).signWith(getKey()).compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
