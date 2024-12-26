package com.LucianoPulido.LucianoPulido.persistence.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Session;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface SessionRepository extends GenericRepository<Session, String>, CrudRepository<Session, String>{

}
