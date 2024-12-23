package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 30, message = "Name must be less than 30 characters")
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(max = 30, message = "Subject must not be longer than 30 characters")
    private String subject;

    @NotBlank
    @Size(max = 300, message = "Message must not be longer than 300 characters")
    private String message;

    public ContactDTO() {
    }

    public ContactDTO(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    
}
