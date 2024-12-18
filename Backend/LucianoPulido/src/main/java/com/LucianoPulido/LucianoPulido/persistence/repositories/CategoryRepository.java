package com.LucianoPulido.LucianoPulido.persistence.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Category;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface CategoryRepository extends GenericRepository<Category, String>, CrudRepository<Category, String>{

}
