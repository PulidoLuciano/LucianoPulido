package com.LucianoPulido.LucianoPulido.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Responses")
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "main_comment_id", nullable = false, updatable = false)
    private Comment mainComment;

    @OneToOne
    @JoinColumn(name = "response_comment_id", nullable = false, updatable = false)
    private Comment responseComment;

    public Response(UUID id, Comment mainComment, Comment responseComment) {
        this.id = id;
        this.mainComment = mainComment;
        this.responseComment = responseComment;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Comment getMainComment() {
        return mainComment;
    }

    public void setMainComment(Comment mainComment) {
        this.mainComment = mainComment;
    }

    public Comment getResponseComment() {
        return responseComment;
    }

    public void setResponseComment(Comment responseComment) {
        this.responseComment = responseComment;
    }
}
