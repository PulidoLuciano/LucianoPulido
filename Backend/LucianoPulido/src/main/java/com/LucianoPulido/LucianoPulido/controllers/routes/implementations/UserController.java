package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserExistsDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.UserMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
