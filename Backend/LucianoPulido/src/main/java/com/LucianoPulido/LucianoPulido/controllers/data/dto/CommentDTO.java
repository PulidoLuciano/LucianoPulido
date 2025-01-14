package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.Date;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public class CommentDTO {

    private UUID id;

    @NotBlank
    private String message;

    private Date date;

    private String username;

    public CommentDTO() {
    }

    public CommentDTO(UUID id, @NotBlank String message, Date date, String username) {
        this.id = id;
        this.message = message;
        this.date = date;
        this.username = username;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    
}
