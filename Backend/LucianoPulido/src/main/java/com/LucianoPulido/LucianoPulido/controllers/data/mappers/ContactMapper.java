package com.LucianoPulido.LucianoPulido.controllers.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ContactDTO;
import com.LucianoPulido.LucianoPulido.models.Contact;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ContactMapper extends GenericMapper<Contact, ContactDTO>{

}
