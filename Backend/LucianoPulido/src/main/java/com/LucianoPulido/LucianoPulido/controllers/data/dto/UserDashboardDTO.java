package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.UUID;

public class UserDashboardDTO {

    private UUID id;

    private String username;

    private Integer comments;

    public UserDashboardDTO() {
    }

    public UserDashboardDTO(UUID id, String username, Integer comments) {
        this.id = id;
        this.username = username;
        this.comments = comments;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getComments() {
        return comments;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }
}
