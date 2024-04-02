package com.uniasselvi.lwdstore.controller;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.dto.UserDTO;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAllUsersPaged(Pageable pageable) {
        Page<UserDTO> users = userService.findAllUsersPaged(pageable);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable Long id) {
        UserDTO user = userService.findUserById(id);
        return ResponseEntity.ok().body(user);

    }


}
