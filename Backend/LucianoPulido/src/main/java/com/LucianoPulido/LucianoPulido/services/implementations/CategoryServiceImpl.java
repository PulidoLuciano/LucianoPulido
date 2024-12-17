package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Category;
import com.LucianoPulido.LucianoPulido.persistence.repositories.CategoryRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.CategoryService;

@Service
public class CategoryServiceImpl extends GenericServiceImpl<Category, UUID, CategoryRepository> implements CategoryService{

}
