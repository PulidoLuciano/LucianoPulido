package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticleDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticleMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;

public class ArticleController extends GenericController<Article, String, ArticlesService, ArticleDTO, ArticleMapper>{

}
