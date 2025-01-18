package com.LucianoPulido.LucianoPulido.controllers.data.dto;

public class ArticleDashboardDTO {

    private String url;

    private String title;

    private Long views;

    private Integer comments;

    public ArticleDashboardDTO() {
    }

    public ArticleDashboardDTO(String url, String title, Long views, Integer comments) {
        this.url = url;
        this.title = title;
        this.views = views;
        this.comments = comments;
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

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Integer getComments() {
        return comments;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }
}
