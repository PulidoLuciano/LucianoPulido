package com.LucianoPulido.LucianoPulido.controllers.data.dto;

public class CategoryDTO {

    String url;

    String name;

    public CategoryDTO() {
    }

    public CategoryDTO(String url, String name) {
        this.url = url;
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
