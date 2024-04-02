package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.dto.UserDTO;
import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllUsersPaged(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> new UserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO findUserById(Long id) {
        Optional<User> opt =  userRepository.findById(id);
        User user = opt.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return new UserDTO(user);
    }
}
