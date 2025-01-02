package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UserExistsDTO {

    @Email
    private String email;

    @Size(max= 30)
    private String username;

    public UserExistsDTO() {
    }

    public UserExistsDTO(@Email String email, String username) {
        this.email = email;
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
