package com.LucianoPulido.LucianoPulido.controllers.data.dto;

public class JwtAuthResponse {
    
    private String username;
    private Boolean isAdmin;
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    
    public JwtAuthResponse() {
    }

    public JwtAuthResponse(String username, Boolean isAdmin, String accessToken, String refreshToken, String tokenType) {
        this.isAdmin = isAdmin;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
