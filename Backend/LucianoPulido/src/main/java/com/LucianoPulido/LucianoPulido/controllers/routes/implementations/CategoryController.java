package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.CategoryMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Category;
import com.LucianoPulido.LucianoPulido.services.interfaces.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController extends GenericController<Category, String, CategoryService, CategoryDTO, CategoryMapper>{

}
