package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticlePreview;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticlesPreviewWithDescription;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryPageDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryPreviewDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticlePreviewMapper;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticlePreviewWithDescriptionMapper;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.CategoryMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.models.Category;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;
import com.LucianoPulido.LucianoPulido.services.interfaces.CategoryService;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/category")
public class CategoryController
                extends GenericController<Category, String, CategoryService, CategoryDTO, CategoryMapper> {

        @Autowired
        private ArticlePreviewMapper articlePreviewMapper;
        @Autowired
        private ArticlesService articlesService;
        @Autowired
        private ArticlePreviewWithDescriptionMapper articlePreviewWithDescriptionMapper;

        @GetMapping("/{id}/preview")
        public ResponseEntity<CategoryPreviewDTO> getCategoryPreview(@PathVariable("id") String categoryId) {
                Category category = super.getServicio().getById(categoryId)
                                .orElseThrow(() -> new IllegalArgumentException("There's no category with that id"));
                CategoryDTO categoryDto = super.getMapper().toDTO(category);
                List<ArticlePreview> articles = articlePreviewMapper
                                .toDTOList(category.getArticles().stream()
                                                .sorted((e1, e2) -> e2.getDate().compareTo(e1.getDate()))
                                                .filter(e -> e.isPublished()).limit(10).toList());
                CategoryPreviewDTO response = new CategoryPreviewDTO(categoryDto, articles);
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/{id}/page")
        public ResponseEntity<List<ArticlesPreviewWithDescription>> getCategoryPage(@PathVariable("id") String categoryId, @RequestParam("limit") int limit, @RequestParam("offset") int offset) {
                Set<Article> articles = articlesService.findArticlesByCategoryUrl(categoryId, limit, offset);
                List<ArticlesPreviewWithDescription> response = articlePreviewWithDescriptionMapper.toDTOList(articles.stream().toList());
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/recent/page")
        public ResponseEntity<List<ArticlesPreviewWithDescription>> getRecentPage(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
                Set<Article> articles = articlesService.findLastArticles(limit, offset);
                List<ArticlesPreviewWithDescription> response = articlePreviewWithDescriptionMapper.toDTOList(articles.stream().toList());
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/recent/preview")
        public ResponseEntity<CategoryPreviewDTO> getRecentPreview() {
                CategoryDTO categoryDto = new CategoryDTO("recent", "Recent");
                List<ArticlePreview> articles = articlePreviewMapper
                                .toDTOList(articlesService.getAll().stream()
                                                .sorted((e1, e2) -> e2.getDate().compareTo(e1.getDate()))
                                                .filter(e -> e.isPublished()).limit(10).toList());
                CategoryPreviewDTO response = new CategoryPreviewDTO(categoryDto, articles);
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/popular/page")
        public ResponseEntity<List<ArticlesPreviewWithDescription>> getPopularPage(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
                Set<Article> articles = articlesService.findPopularArticles(limit, offset);
                List<ArticlesPreviewWithDescription> response = articlePreviewWithDescriptionMapper.toDTOList(articles.stream().toList());
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/popular/preview")
        public ResponseEntity<CategoryPreviewDTO> getPopularPreview() {
                CategoryDTO categoryDto = new CategoryDTO("popular", "Popular");
                List<ArticlePreview> articles = articlePreviewMapper
                                .toDTOList(articlesService.getAll().stream()
                                                .sorted((e1, e2) -> e2.getViews().compareTo(e1.getViews()))
                                                .filter(e -> e.isPublished()).limit(10).toList());
                CategoryPreviewDTO response = new CategoryPreviewDTO(categoryDto, articles);
                return new ResponseEntity<>(response, HttpStatus.OK);
        }
}
