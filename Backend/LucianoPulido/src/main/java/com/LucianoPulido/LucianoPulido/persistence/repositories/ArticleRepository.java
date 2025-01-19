package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface ArticleRepository extends GenericRepository<Article, String>, CrudRepository<Article, String>{

    @Query(value = "SELECT * FROM articles ORDER BY date DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Article> findDashboardInfo(@Param("limit") int limit, @Param("offset") int offset);
}
