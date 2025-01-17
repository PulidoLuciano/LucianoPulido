package com.LucianoPulido.LucianoPulido.services.implementations;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.persistence.repositories.CommentRepository;
import com.LucianoPulido.LucianoPulido.security.JwtService;
import com.LucianoPulido.LucianoPulido.services.base.GenericServiceImpl;
import com.LucianoPulido.LucianoPulido.services.interfaces.CommentService;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;

@Service
public class CommentServiceImpl extends GenericServiceImpl<Comment, UUID, CommentRepository> implements CommentService {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;

    @Override
    public Set<Comment> getResponsesById(UUID id) {
        Comment parent = super.getRepositorio().findById(id)
                .orElseThrow(() -> new IllegalArgumentException("The comment does not exist"));
        return parent.getResponses();
    }

    @Override
    public Comment createResponseByParentId(UUID id, String message, String token) throws Exception {
        Comment comment = super.getRepositorio().findById(id)
                .orElseThrow(() -> new IllegalArgumentException("The comment does not exist"));
        UUID userId = jwtService.extractUserId(token);
        User user = userService.getById(userId)
                .orElseThrow(() -> new IllegalArgumentException("The user does not exist"));
        Comment response = comment.createResponse(message, user);
        response = super.getRepositorio().save(response);
        return response;
    }

}
