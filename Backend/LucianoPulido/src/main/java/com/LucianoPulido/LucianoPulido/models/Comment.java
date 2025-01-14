package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private Date date;

    @Column
    private String message;

    @ManyToOne(optional = false)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id", nullable = true, updatable = false)
    private Set<Comment> responses;

    public Comment(){
        this.date = new Date();
    }
    
    public Comment(UUID id, Date date, String message, Article article, User user,
            Set<Comment> responses) {
        this.id = id;
        this.date = new Date();
        this.message = message;
        this.article = article;
        this.user = user;
        this.responses = responses;
    }

    public Comment(String message, Article article, User user) {
        this.message = message;
        this.article = article;
        this.user = user;
        this.date = new Date();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Comment> getResponses() {
        return responses;
    }

    public void setResponses(Set<Comment> responses) {
        this.responses = responses;
    }
}
