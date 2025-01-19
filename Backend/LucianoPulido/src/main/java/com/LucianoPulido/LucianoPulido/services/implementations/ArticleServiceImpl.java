package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.ArticleRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;
import com.LucianoPulido.LucianoPulido.services.interfaces.CommentService;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class ArticleServiceImpl extends GenericServiceImpl<Article, String, ArticleRepository> implements ArticlesService{

    @Autowired
    UserService userService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CommentService commentService;

    @Override
    public Optional<Article> getById(String id){
        Optional<Article> optionalArticle = super.getById(id);
        if(optionalArticle.isPresent()){
            Article article = optionalArticle.get();
            article.setViews(article.getViews() + 1);
            super.save(article);
        }
        return optionalArticle;
    }

    @Override
    public Comment createComment(String articleId, String message, String token) {
        Article article = super.getRepositorio().findById(articleId).orElseThrow(() -> new IllegalArgumentException("The article does not exist"));
        UUID userId = jwtService.extractUserId(token);
        User user = userService.getById(userId).orElseThrow(() -> new IllegalArgumentException("The user does not exist"));
        Comment comment = article.createComment(message, user);
        comment = commentService.save(comment);
        return comment;
    }

    @Override
    public Set<Comment> getComments(String id){
        Article article = super.getRepositorio().findById(id).orElseThrow(() -> new IllegalArgumentException("The article does not exist"));
        return article.getComments();
    }

    @Override
    public Set<Article> getDashboardInfo(int limit, int offset) {
        return super.getRepositorio().findDashboardInfo(limit, offset);
    }

    @Override
    public Long count() {
        return super.getRepositorio().count();
    }

    @Override
    public Long countViews() {
        return super.getRepositorio().countViews();
    }
}
