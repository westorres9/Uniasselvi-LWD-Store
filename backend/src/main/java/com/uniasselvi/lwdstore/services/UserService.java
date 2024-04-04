package com.uniasselvi.lwdstore.services;
import com.uniasselvi.lwdstore.dto.UserDTO;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllPaged(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> new UserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        Optional<User> opt = userRepository.findById(id);
        User user = opt.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO insert(UserDTO dto) {
        User entity = new User();
        copyDtoToEntity(dto, entity);
        entity = userRepository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        try {
            User entity = userRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = userRepository.save(entity);
            return new UserDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
        try {
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Violação de integridade referencial");
        }
    }

    private void copyDtoToEntity(UserDTO dto, User entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setBirthDate(dto.getBirthDate());
        entity.setPhoneNumber(dto.getPhoneNumber());
    }

}
