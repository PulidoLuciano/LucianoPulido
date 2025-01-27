package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ChangeDataDTO {

    private String password;

    @NotBlank
    private String currentPassword;

    @NotBlank
    @Size(max= 30)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotNull
    private Boolean sendEmails;

    public ChangeDataDTO() {
    }

    public ChangeDataDTO(String password, String currentPassword, @NotBlank @Size(max = 30) String username,
            @NotBlank @Email String email, @NotNull Boolean sendEmails) {
        this.password = password;
        this.currentPassword = currentPassword;
        this.username = username;
        this.email = email;
        this.sendEmails = sendEmails;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getSendEmails() {
        return sendEmails;
    }

    public void setSendEmails(Boolean sendEmails) {
        this.sendEmails = sendEmails;
    }
}
