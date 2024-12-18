package com.LucianoPulido.LucianoPulido.models;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {

    @Id
    private String email;

    @Column
    private String password;

    @Column
    private String username;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @Column(name = "send_emails")
    private Boolean sendEmails;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Comment> comments;

    public User(String email, String password, String username, Boolean isAdmin, Boolean sendEmails,
            Set<Comment> comments) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.isAdmin = isAdmin;
        this.sendEmails = sendEmails;
        this.comments = comments;
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

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean getSendEmails() {
        return sendEmails;
    }

    public void setSendEmails(Boolean sendEmails) {
        this.sendEmails = sendEmails;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
}
