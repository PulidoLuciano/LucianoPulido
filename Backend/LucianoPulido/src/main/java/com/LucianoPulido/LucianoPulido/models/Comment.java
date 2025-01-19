package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;
import java.util.HashSet;
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

    @ManyToOne(optional = true)
    @JoinColumn(name = "article_id", nullable = true, updatable = false)
    private Article article;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private Set<Comment> responses;
    
    @ManyToOne(optional = true)
    @JoinColumn(name = "parent_id", nullable = true, updatable = false)
    private Comment parent;
    
    public Comment(){
        this.date = new Date();
    }
    
    public Comment(UUID id, Date date, String message, Article article, User user,
            Set<Comment> responses, Comment parent) {
        this.id = id;
        this.date = new Date();
        this.message = message;
        this.article = article;
        this.user = user;
        this.responses = responses;
        this.parent = parent;
    }

    public Comment(String message, Article article, User user, Comment parent) {
        this.message = message;
        this.article = article;
        this.user = user;
        this.date = new Date();
        this.parent = parent;
    }

    public Comment createResponse(String message, User user){
        Comment response = new Comment(message, null, user, this);
        this.getResponses().add(response);
        return response;
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
        Article searchArticle = this.article;
        if(searchArticle == null){
            searchArticle = parent.getArticle();
        } 
        return searchArticle;
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
        if(this.responses == null) this.responses = new HashSet<>();
        return responses;
    }

    public void setResponses(Set<Comment> responses) {
        this.responses = responses;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }
}
