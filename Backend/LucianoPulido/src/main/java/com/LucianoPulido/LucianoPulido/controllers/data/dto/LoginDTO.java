package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import jakarta.validation.constraints.NotEmpty;

public class LoginDTO {
    
    private String email;
    private String password;

    @NotEmpty(message = "Keep logged in must be specified")
    private Boolean keepLoggedIn;
    
    public LoginDTO() {
    }

    public LoginDTO(String email, String password, Boolean keepLoggedIn) {
        this.email = email;
        this.password = password;
        this.keepLoggedIn = keepLoggedIn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getKeepLoggedIn() {
        return keepLoggedIn;
    }

    public void setKeepLoggedIn(Boolean keepLoggedIn) {
        this.keepLoggedIn = keepLoggedIn;
    }
}
