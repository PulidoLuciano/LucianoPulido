package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Set;
import java.util.UUID;

import com.LucianoPulido.LucianoPulido.models.Contact;
import com.LucianoPulido.LucianoPulido.services.base.GenericService;

public interface ContactService extends GenericService<Contact, UUID> {

    Long count();

    Set<Contact> findWithPagination(int limit, int offset);
}
