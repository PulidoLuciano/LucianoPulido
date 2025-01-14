package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.CommentDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.CommentMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.services.interfaces.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController extends GenericController<Comment, UUID, CommentService, CommentDTO, CommentMapper>{

}
