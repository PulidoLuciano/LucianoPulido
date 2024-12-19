package com.LucianoPulido.LucianoPulido.controllers.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDTO;
import com.LucianoPulido.LucianoPulido.models.User;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper extends GenericMapper<User, UserDTO>{

}
