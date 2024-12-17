package com.LucianoPulido.LucianoPulido.models;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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
}
