package com.LucianoPulido.LucianoPulido.controllers.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.CommentDTO;
import com.LucianoPulido.LucianoPulido.models.Comment;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper extends GenericMapper<Comment, CommentDTO>{

}
