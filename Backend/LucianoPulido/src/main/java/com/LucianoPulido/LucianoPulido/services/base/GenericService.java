package com.LucianoPulido.LucianoPulido.services.base;

import java.util.List;
import java.util.Optional;

public interface GenericService<T, ID> {
    public List<T> getAll();
    public T save(T paciente);
    public Optional<T> getById(ID id);
    public void deleteById(ID id);
}
