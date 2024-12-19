package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Articles")
public class Article {

    @Id
    private String url;

    @Column
    private Date date;

    @Column
    private boolean published;

    @Column
    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    @Column
    private String description;

    @Column
    private String body;

    @Column
    private Long views;

    @ManyToMany
    @JoinTable(name = "Article_Category", joinColumns = @JoinColumn(name = "article_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    Set<Category> categories;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "article")
    private Set<Comment> comments;

    public Article(String url, Date date, boolean published, String title, String imageUrl, String description,
            String body, Long views, Set<Category> categories, Set<Comment> comments) {
        this.url = url;
        this.date = date;
        this.published = published;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.body = body;
        this.views = views;
        this.categories = categories;
        this.comments = comments;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
}
