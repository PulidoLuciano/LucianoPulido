package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface ArticleRepository extends GenericRepository<Article, UUID>, CrudRepository<Article, UUID>{
}
