package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "sessions")
public class Session {
    
    @Transient
    private String accessToken;

    @Id
    private String token;

    @Column
    private Date issued;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    public Session() {
    }

    public Session(String token, Date issued, User user) {
        this.token = token;
        this.issued = issued;
        this.user = user;
    }

    public Session(String token, Date issued, User user, String accessToken) {
        this.token = token;
        this.issued = issued;
        this.user = user;
        this.accessToken = accessToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getIssued() {
        return issued;
    }

    public void setIssued(Date issued) {
        this.issued = issued;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
