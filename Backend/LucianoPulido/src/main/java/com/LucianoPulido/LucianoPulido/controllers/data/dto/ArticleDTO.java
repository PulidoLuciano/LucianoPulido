package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.Set;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ArticleDTO {

    @NotBlank
    @Length(min = 3, max = 100)
    private String url;

    @NotNull
    private boolean published;

    @NotBlank
    @Length(min = 1, max=75)
    private String title;

    @NotBlank
    private String imageUrl;

    @NotBlank
    @Length(max=200)
    private String description;

    @NotBlank
    private String body;

    Set<CategoryDTO> categories;

    public ArticleDTO() {
    }

    public ArticleDTO(String url, boolean published, String title, String imageUrl, String description,
            String body, Set<CategoryDTO> categories) {
        this.url = url;
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

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
        this.categories = categories;
    }
}
