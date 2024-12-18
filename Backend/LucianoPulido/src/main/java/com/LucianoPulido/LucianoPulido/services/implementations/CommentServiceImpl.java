package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.persistence.repositories.CommentRepository;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.CommentService;

@Service
public class CommentServiceImpl extends GenericServiceImpl<Comment, UUID, CommentRepository> implements CommentService{

}
