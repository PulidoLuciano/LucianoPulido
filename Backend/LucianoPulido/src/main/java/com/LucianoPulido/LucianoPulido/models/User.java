package com.LucianoPulido.LucianoPulido.models;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column(name = "is_admin")
    private Boolean isAdmin = false;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "send_emails")
    private Boolean sendEmails;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Session> sessions;

    public User() {
    }

    public User(String email, String password, String username, Boolean sendEmails,
            Set<Comment> comments) {
        setEmail(email);
        setPassword(password);
        setUsername(username);
        setEmail(email);
        setSendEmails(sendEmails);
        setComments(comments);
        setIsAdmin(false);
    }

    public User(UUID id, String username, String email, String password, Boolean isAdmin, Boolean isVerified,
            Boolean sendEmails,
            Set<Comment> comments, Set<Session> sessions) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isVerified = isVerified;
        this.sendEmails = sendEmails;
        this.comments = comments;
        this.sessions = sessions;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email.isBlank() || email == null)
            throw new IllegalArgumentException("Email must not be blank");
        if (!email.matches(
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"))
            throw new IllegalArgumentException(email + " is not a valid email");
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        if (password.isBlank() || password == null)
            throw new IllegalArgumentException("Password must not be blank");
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if (username.isBlank() || username == null)
            throw new IllegalArgumentException("Username must not be blank");
        if (username.length() > 30)
            throw new IllegalArgumentException("Username must not be longer than 30 characters");
        if (!username.matches("^[a-zA-Z0-9._-]+$"))
            throw new IllegalArgumentException(
                    "Username must only contain letters, numbers, periods, underscores, and hyphens");
        this.username = username;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = (isAdmin) ? true : false;
    }

    public Boolean getSendEmails() {
        return sendEmails;
    }

    public void setSendEmails(Boolean sendEmails) {
        this.sendEmails = (sendEmails) ? true : false;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
}
