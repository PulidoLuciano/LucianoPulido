package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.CommentDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.CommentDashboardDTO;

import com.LucianoPulido.LucianoPulido.controllers.data.mappers.CommentMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.security.TokenException;
import com.LucianoPulido.LucianoPulido.services.interfaces.CommentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/comment")
public class CommentController extends GenericController<Comment, UUID, CommentService, CommentDTO, CommentMapper> {

    @GetMapping("/{id}/response")
    public ResponseEntity<List<CommentDTO>> getCommentsByArticle(@PathVariable("id") UUID id) {
        Set<Comment> responses = super.getServicio().getResponsesById(id);
        List<CommentDTO> responsesDTO = responses.stream().map(response -> new CommentDTO(response.getId(),
                response.getMessage(), response.getDate(), response.getUser().getUsername()))
                .collect(Collectors.toSet()).stream().sorted((e1, e2) -> e1.getDate().compareTo(e2.getDate())).collect(Collectors.toList());
        return new ResponseEntity<>(responsesDTO, HttpStatus.OK);
    }

    @PostMapping("/{id}/response")
    public ResponseEntity<CommentDTO> postResponseOnParentComment(@PathVariable("id") UUID id, @Valid @RequestBody CommentDTO dto, @RequestHeader("Authorization") String authorizationHeader) throws TokenException, Exception {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new TokenException("The authorization header is missing or does not have the Bearer prefix");
        }
        String token = authorizationHeader.substring(7);
        
        Comment response = super.getServicio().createResponseByParentId(id, dto.getMessage(), token);
        CommentDTO responseDto = new CommentDTO(response.getId(), response.getMessage(), response.getDate(), response.getUser().getUsername());
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/count")
    public Map<String, Long> countArticles() {
        return Map.of("count", super.getServicio().count());
    }

    @GetMapping("/count/responses")
    public Map<String, Long> countArticleViews() {
        return Map.of("count", super.getServicio().countResponses());
    }

    @GetMapping("/dashboard")
    public List<CommentDashboardDTO> getArticleDashboardInfo(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
        Set<Comment> comments = super.getServicio().getWithPagination(limit, offset);
        List<CommentDashboardDTO> response = comments.stream().map(e -> new CommentDashboardDTO(e.getId(), e.getMessage(), e.getArticle().getUrl(), e.getUser().getUsername())).toList();
        return response;
    }
}
