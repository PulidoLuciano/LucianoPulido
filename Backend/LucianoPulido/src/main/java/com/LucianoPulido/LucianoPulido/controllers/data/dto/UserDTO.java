package com.LucianoPulido.LucianoPulido.controllers.data.dto;

public class UserDTO {

    private String email;

    private String password;

    private String username;

    private Boolean sendEmails;

    public UserDTO() {
    }

    public UserDTO(String email, String password, String username, Boolean sendEmails) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.sendEmails = sendEmails;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getSendEmails() {
        return sendEmails;
    }

    public void setSendEmails(Boolean sendEmails) {
        this.sendEmails = sendEmails;
    }
}
