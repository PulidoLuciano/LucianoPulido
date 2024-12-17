package com.LucianoPulido.LucianoPulido.services.base;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

public class GenericServiceImpl<T, ID, IRepository extends GenericRepository<T, ID>> implements GenericService<T, ID> {

    @Autowired
    private IRepository repositorio;

    @Override
    public List<T> getAll(){
        return (List<T>) repositorio.findAll();
    }

    @Override
    public T save(T entity) {
        return repositorio.save(entity);
    }

    @Override
    public Optional<T> getById(ID id) {
        return repositorio.findById(id);
    }

    @Override
    public void deleteById(ID id){
        repositorio.deleteById(id);
    }

    public IRepository getRepositorio() {
        return repositorio;
    }

    public void setRepositorio(IRepository repositorio) {
        this.repositorio = repositorio;
    }
}
