package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticlePreview;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryPreviewDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticlePreviewMapper;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.CategoryMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Category;
import com.LucianoPulido.LucianoPulido.services.interfaces.CategoryService;

import java.util.List;

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

    @GetMapping("/{id}/preview")
    public ResponseEntity<CategoryPreviewDTO> getCategoryPreview(@PathVariable("id") String categoryId) {
        Category category = super.getServicio().getById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("There's no category with that id"));
        CategoryDTO categoryDto = super.getMapper().toDTO(category);
        List<ArticlePreview> articles = articlePreviewMapper
                .toDTOList(category.getArticles().stream().sorted((e1, e2) -> e1.getDate().compareTo(e2.getDate()))
                        .filter(e -> e.isPublished()).limit(5).toList());
        CategoryPreviewDTO response = new CategoryPreviewDTO(categoryDto, articles);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
