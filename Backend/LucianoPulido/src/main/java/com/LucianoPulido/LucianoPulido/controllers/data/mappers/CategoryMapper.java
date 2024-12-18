package com.LucianoPulido.LucianoPulido.controllers.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.CategoryDTO;
import com.LucianoPulido.LucianoPulido.models.Category;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper extends GenericMapper<Category, CategoryDTO>{

}
