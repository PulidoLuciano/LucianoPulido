package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.ArticleDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CommentDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.ArticleMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Article;
import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.security.TokenException;
import com.LucianoPulido.LucianoPulido.services.interfaces.ArticlesService;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/article")
public class ArticleController extends GenericController<Article, String, ArticlesService, ArticleDTO, ArticleMapper> {

    @PostMapping("/{id}/comment")
    public ResponseEntity<CommentDTO> createComment(@PathVariable("id") String id, @RequestBody CommentDTO comment,
            @RequestHeader("Authorization") String authorizationHeader) throws TokenException {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new TokenException("The authorization header is missing or does not have the Bearer prefix");
        }
        String token = authorizationHeader.substring(7);

        Comment commentCreated = super.getServicio().createComment(id, comment.getMessage(), token);

        CommentDTO dto = new CommentDTO();
        dto.setDate(commentCreated.getDate());
        dto.setId(commentCreated.getId());
        dto.setMessage(commentCreated.getMessage());
        dto.setUsername(commentCreated.getUser().getUsername());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/comment")
    public Set<CommentDTO> getComments(@PathVariable("id") String id) {
        Set<Comment> comments = super.getServicio().getComments(id);
        Set<CommentDTO> commentDTOs = comments.stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getMessage(),
                        comment.getDate(),
                        comment.getUser().getUsername()))
                .collect(Collectors.toSet());
        return commentDTOs;
    }

}
