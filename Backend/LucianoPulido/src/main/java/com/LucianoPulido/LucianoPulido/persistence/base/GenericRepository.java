package com.LucianoPulido.LucianoPulido.persistence.base;

import org.springframework.data.repository.CrudRepository;

public interface GenericRepository<T,ID> extends CrudRepository<T,ID>{
}
