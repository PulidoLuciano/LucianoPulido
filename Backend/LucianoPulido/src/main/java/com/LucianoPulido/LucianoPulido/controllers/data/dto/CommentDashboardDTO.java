package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.UUID;

public class CommentDashboardDTO {

    private UUID id;

    private String message;

    private String articleUrl;

    private String username;

    public CommentDashboardDTO() {
    }

    public CommentDashboardDTO(UUID id, String message, String articleUrl, String username) {
        this.id = id;
        this.message = message;
        this.articleUrl = articleUrl;
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

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
