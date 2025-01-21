package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class ArticlesPreviewWithDescription{

    @NotBlank
    @Length(min = 3, max = 100)
    private String url;

    @NotBlank
    @Length(min = 1, max=75)
    private String title;

    @NotBlank
    private String imageUrl;

    private Date date;

    private String description;

    public ArticlesPreviewWithDescription() {
    }

    public ArticlesPreviewWithDescription(@NotBlank @Length(min = 3, max = 100) String url,
            @NotBlank @Length(min = 1, max = 75) String title, @NotBlank String imageUrl, Date date,
            String description) {
        this.url = url;
        this.title = title;
        this.imageUrl = imageUrl;
        this.date = date;
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
