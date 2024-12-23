package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Contact;
import com.LucianoPulido.LucianoPulido.persistence.repositories.ContactRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.ContactService;

@Service
public class ContactServiceImpl extends GenericServiceImpl<Contact, UUID, ContactRepository> implements ContactService{

}
