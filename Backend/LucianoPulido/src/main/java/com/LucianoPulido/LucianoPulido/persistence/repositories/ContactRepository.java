package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Contact;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface ContactRepository extends GenericRepository<Contact, UUID>, CrudRepository<Contact, UUID> {
    
    @Query(value = "SELECT * FROM contacts ORDER BY date DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Contact> findWithPagination(@Param("limit") int limit, @Param("offset") int offset);
}
