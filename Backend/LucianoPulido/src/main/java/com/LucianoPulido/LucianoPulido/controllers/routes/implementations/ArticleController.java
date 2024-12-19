package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticleDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticleMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;

@RestController
@RequestMapping("/article")
public class ArticleController extends GenericController<Article, String, ArticlesService, ArticleDTO, ArticleMapper>{

}
