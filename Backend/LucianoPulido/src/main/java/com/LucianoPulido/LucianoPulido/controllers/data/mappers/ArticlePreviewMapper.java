package com.LucianoPulido.LucianoPulido.controllers.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticlePreview;
import com.LucianoPulido.LucianoPulido.models.Article;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ArticlePreviewMapper extends GenericMapper<Article, ArticlePreview> {
}
