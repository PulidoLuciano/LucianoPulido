package com.LucianoPulido.LucianoPulido.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Categories")
public class Category {

    @Id
    private String url;

    @Column
    private String name;

    @ManyToMany(mappedBy = "categories")
    Set<Article> articles;

    public Category() {
    }

    public Category(String url, String name, Set<Article> articles) {
        this.url = url;
        this.name = name;
        this.articles = articles;
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

    public Set<Article> getArticles() {
        return articles;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }
}
