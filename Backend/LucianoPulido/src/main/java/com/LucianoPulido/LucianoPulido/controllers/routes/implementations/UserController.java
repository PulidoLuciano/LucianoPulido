package com.LucianoPulido.LucianoPulido.controllers.routes.implementations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LucianoPulido.LucianoPulido.controllers.data.dto.UserDTO;
import com.LucianoPulido.LucianoPulido.controllers.data.mappers.UserMapper;
import com.LucianoPulido.LucianoPulido.controllers.routes.base.GenericController;
import com.LucianoPulido.LucianoPulido.models.User;
import com.LucianoPulido.LucianoPulido.services.interfaces.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/user")
public class UserController extends GenericController<User, UUID, UserService, UserDTO, UserMapper>{

    @PutMapping("/{id}")
    public ResponseEntity<Void> editUserData(@PathVariable String id, @RequestBody UserDTO entity) {
        
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
