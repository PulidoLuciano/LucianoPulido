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

    @Query(value = "SELECT SUM(views) FROM articles", nativeQuery = true)
    public Long countViews();

    @Query(value = "SELECT * FROM articles WHERE LOWER(title) LIKE :searchRegex", nativeQuery = true)
    public Set<Article> searchArticlesByTitle(@Param("searchRegex") String searchRegex);

    @Query(value = "SELECT * FROM articles as a, article_category as ac WHERE ac.article_id = a.url AND ac.category_id = :categoryUrl AND published = TRUE ORDER BY date DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Article> findArticlesByCategoryUrl(@Param("categoryUrl") String categoryUrl, @Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT * FROM articles as a WHERE published = TRUE ORDER BY date DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Article> findLastPublishedArticles(@Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT * FROM articles as a WHERE published = TRUE ORDER BY views DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Article> findPopularPublishedArticles(@Param("limit") int limit, @Param("offset") int offset);
}
