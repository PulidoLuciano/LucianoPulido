package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChangePasswordDTO {

    @NotBlank
    private String token;
    @NotBlank
    @Size(min = 5, max = 255)
    private String password;

    public ChangePasswordDTO() {
    }

    public ChangePasswordDTO(String token, String password) {
        this.token = token;
        this.password = password;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
