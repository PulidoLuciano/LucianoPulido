package com.LucianoPulido.LucianoPulido.persistence.base;

import java.util.Optional;

public interface GenericRepository<T,ID>{

    public T save(T entity);

    public Optional<T> findById(ID id);

    public boolean existsById(ID id);

    public Iterable<T> findAll();

    public void deleteById(ID id);
}
