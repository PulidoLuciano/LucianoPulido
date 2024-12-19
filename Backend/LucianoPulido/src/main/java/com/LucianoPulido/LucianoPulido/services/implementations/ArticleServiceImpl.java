package com.LucianoPulido.LucianoPulido.services.implementations;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.persistence.repositories.ArticleRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;

@Service
public class ArticleServiceImpl extends GenericServiceImpl<Article, String, ArticleRepository> implements ArticlesService{

}
