package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDashboardDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserExistsDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.UserMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/user")
public class UserController extends GenericController<User, UUID, UserService, UserDTO, UserMapper>{

    @PutMapping("/{id}")
    public ResponseEntity<Void> editUserData(@PathVariable String id, @RequestBody UserDTO entity) {
        
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/exists")
    public Map<String, Boolean> existsByUsername(@RequestBody UserExistsDTO data) {
        String username = data.getUsername();
        String email = data.getEmail();
        Boolean exists = false;
        if(username != null){
            exists = getServicio().existsByUsername(username);
        }
        if(email != null && !exists){
            exists = getServicio().existsByEmail(email);
        }
        return Map.of("exists", exists);
    }

    @GetMapping("/dashboard")
    public List<UserDashboardDTO> getArticleDashboardInfo(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
        Set<User> users = super.getServicio().findWithPagination(limit, offset);
        List<UserDashboardDTO> response = users.stream().map(e -> new UserDashboardDTO(e.getId(), e.getUsername(), e.getComments().size())).toList();
        return response;
    }

    @GetMapping("/dashboard/search")
    public List<UserDashboardDTO> getArticleDashboardInfo(@RequestParam("query") String search) {
        Set<User> users = super.getServicio().searchUserByUsername(search);
        List<UserDashboardDTO> response = users.stream().map(e -> new UserDashboardDTO(e.getId(), e.getUsername(), e.getComments().size())).toList();
        return response;
    }

    @GetMapping("/count")
    public Map<String, Long> countArticles() {
        return Map.of("count", super.getServicio().count());
    }

    @GetMapping("/count/suscribe")
    public Map<String, Long> countArticleViews() {
        return Map.of("count", super.getServicio().countSuscribe());
    }
}
