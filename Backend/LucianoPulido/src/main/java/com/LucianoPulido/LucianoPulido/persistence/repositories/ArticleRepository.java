package com.LucianoPulido.LucianoPulido.persistence.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface ArticleRepository extends GenericRepository<Article, String>, CrudRepository<Article, String>{
}
