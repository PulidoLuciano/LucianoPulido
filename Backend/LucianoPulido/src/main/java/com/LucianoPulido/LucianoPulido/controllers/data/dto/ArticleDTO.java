package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.Date;
import java.util.Set;

import com.LucianoPulido.LucianoPulido.models.Category;

public class ArticleDTO {

    private String url;

    private Date date;

    private boolean published;

    private String title;

    private String imageUrl;

    private String description;

    private String body;

    Set<Category> categories;

    public ArticleDTO() {
    }

    public ArticleDTO(String url, Date date, boolean published, String title, String imageUrl, String description,
            String body, Set<Category> categories) {
        this.url = url;
        this.date = date;
        this.published = published;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.body = body;
        this.categories = categories;
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

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
