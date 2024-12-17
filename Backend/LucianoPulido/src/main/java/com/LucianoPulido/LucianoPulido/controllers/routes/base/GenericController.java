package com.LucianoPulido.LucianoPulido.controllers.routes.base;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.LucianoPulido.LucianoPulido.controllers.data.mappers.GenericMapper;
import com.LucianoPulido.LucianoPulido.services.base.GenericService;

import jakarta.validation.Valid;

public class GenericController<T, ID, IServicio extends GenericService<T, ID>, TDto, TMapper extends GenericMapper<T, TDto>> {

    @Autowired
    private IServicio servicio;
    @Autowired
    private TMapper mapper;

    @GetMapping
    public ResponseEntity<List<TDto>> getAll(){
        List<T> entities = servicio.getAll();
        List<TDto> dtos = mapper.toDTOList(entities);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<TDto> create(@Valid @RequestBody TDto dto) {
        T entity = mapper.toEntity(dto);
        T savedEntity = servicio.save(entity);
        TDto savedDto = mapper.toDTO(savedEntity);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TDto> getById(@PathVariable("id") ID id){
        Optional<T> optEntity = servicio.getById(id);
        if(optEntity.isEmpty()){
            throw new IllegalArgumentException("La entidad con id " + id + " no existe");
        }
        TDto dto = mapper.toDTO(optEntity.get());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TDto> deleteById(@PathVariable("id") ID id){
        servicio.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public IServicio getServicio() {
        return servicio;
    }

    public void setServicio(IServicio servicio) {
        this.servicio = servicio;
    }

    public TMapper getMapper() {
        return mapper;
    }

    public void setMapper(TMapper mapper) {
        this.mapper = mapper;
    }
}
