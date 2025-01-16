package com.LucianoPulido.LucianoPulido.services.interfaces;

import java.util.Set;
import java.util.UUID;

import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.services.base.GenericService;

public interface CommentService extends GenericService<Comment, UUID>{

    Set<Comment> getResponsesById(UUID id);

    Comment createResponseByParentId(UUID id, String message, String token);
}
