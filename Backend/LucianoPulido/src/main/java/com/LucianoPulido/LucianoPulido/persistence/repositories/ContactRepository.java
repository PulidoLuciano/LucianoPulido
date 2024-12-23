package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Contact;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface ContactRepository extends GenericRepository<Contact, UUID>, CrudRepository<Contact, UUID> {

}
