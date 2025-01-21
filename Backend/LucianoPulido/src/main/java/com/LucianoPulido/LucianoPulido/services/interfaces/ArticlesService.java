package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Set;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.services.base.GenericService;

public interface ArticlesService extends GenericService<Article, String>{

    Comment createComment(String articleId, String message, String token);

    Set<Comment> getComments(String id);

    Set<Article> getDashboardInfo(int limit, int offset);

    Long count();

    Long countViews();

    Set<Article> searchArticlesByTitle(String search);

    Set<Article> findArticlesByCategoryUrl(String categoryUrl, int limit, int offset);

    Set<Article> findLastArticles(int limit, int offset);

    Set<Article> findPopularArticles(int limit, int offset);
}
