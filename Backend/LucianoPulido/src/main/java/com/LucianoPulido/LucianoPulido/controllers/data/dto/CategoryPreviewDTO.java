package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.List;

public class CategoryPreviewDTO {

    private CategoryDTO category;
    private List<ArticlePreview> articles;
    
    public CategoryPreviewDTO() {
    }

    public CategoryPreviewDTO(CategoryDTO category, List<ArticlePreview> articles) {
        this.category = category;
        this.articles = articles;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public List<ArticlePreview> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticlePreview> articles) {
        this.articles = articles;
    }
}
