package com.LucianoPulido.LucianoPulido.controllers.data.dto;

import java.util.List;

public class CategoryPageDTO {

    private CategoryDTO category;
    private List<ArticlesPreviewWithDescription> articles;
    
    public CategoryPageDTO() {
    }

    public CategoryPageDTO(CategoryDTO category, List<ArticlesPreviewWithDescription> articles) {
        this.category = category;
        this.articles = articles;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public List<ArticlesPreviewWithDescription> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticlesPreviewWithDescription> articles) {
        this.articles = articles;
    }
}
