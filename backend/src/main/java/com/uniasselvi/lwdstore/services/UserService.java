package com.uniasselvi.lwdstore.services;
import com.uniasselvi.lwdstore.dto.UserDTO;
import com.uniasselvi.lwdstore.dto.UserInsertDTO;
import com.uniasselvi.lwdstore.entities.Role;
import com.uniasselvi.lwdstore.entities.RoleType;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.projections.UserDetailsProjection;
import com.uniasselvi.lwdstore.repositories.RoleRepository;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllPagedByName(String name, Pageable pageable) {
        Page<User> users = userRepository.searchUsersPagedByFirstNameOrLastName(name,pageable);
        return users.map(user -> new UserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        Optional<User> opt = userRepository.findById(id);
        User user = opt.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO insert(UserInsertDTO dto) {
        User entity = new User();
        copyDtoToEntity(dto, entity);
        Role role = roleRepository.findByAuthority(RoleType.ROLE_CLIENT);
        entity.getRoles().clear();
        entity.getRoles().add(role);
        entity = userRepository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO update(Long id, UserInsertDTO dto) {
        try {
            User entity = userRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity.setPassword(dto.getPassword());
            entity = userRepository.save(entity);
            return new UserDTO(entity);
        }
        catch (EntityNotFoundException e) {
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

    private void copyDtoToEntity(UserInsertDTO dto, User entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setBirthDate(dto.getBirthDate());
        entity.setPhoneNumber(dto.getPhoneNumber());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       List<UserDetailsProjection> result = userRepository.searchUserAndRolesByEmail(username);
       if(result.size() == 0) {
           throw new UsernameNotFoundException("User not found!");
       }
       User user = new User();
       user.setEmail(username);
       user.setPassword(result.get(0).getPassword());
       for(UserDetailsProjection projection : result) {
           user.addRole(new Role(projection.getRoleId(), projection.getAuthority()));
       }
       return user;
    }
}
