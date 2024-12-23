package com.LucianoPulido.LucianoPulido.models;

import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if(email.isBlank() || email == null) throw new IllegalArgumentException("Email must not be blank");
        if(!email.matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")) throw new IllegalArgumentException(email + " is not a valid email");
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        if(password.isBlank() || password == null) throw new IllegalArgumentException("Password must not be blank");
        if(password.length() < 5) throw new IllegalArgumentException("Password must not be shorter than 5 characters");
        if(password.length() > 30) throw new IllegalArgumentException("Password must not be longer than 255 characters");
        this.password = new BCryptPasswordEncoder().encode(password);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if(username.isBlank() || username == null) throw new IllegalArgumentException("Username must not be blank");
        if(username.length() > 30) throw new IllegalArgumentException("Username must not be longer than 30 characters");
        if(!username.matches("^[a-zA-Z0-9._-]+$")) throw new IllegalArgumentException("Username must only contain letters, numbers, periods, underscores, and hyphens");
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
}
