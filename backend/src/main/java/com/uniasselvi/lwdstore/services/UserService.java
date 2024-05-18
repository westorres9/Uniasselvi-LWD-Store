package com.uniasselvi.lwdstore.services;

import java.util.List;
import java.util.Optional;

import com.uniasselvi.lwdstore.projections.UserDetailsProjection;
import com.uniasselvi.lwdstore.repositories.RoleRepository;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.uniasselvi.lwdstore.dto.UserDTO;
import com.uniasselvi.lwdstore.dto.UserInsertDTO;
import com.uniasselvi.lwdstore.entities.Role;
import com.uniasselvi.lwdstore.entities.RoleType;
import com.uniasselvi.lwdstore.entities.User;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPagedByName(String name, Pageable pabeable) {
		Page<User> page = userRepository.searchAllPagedByName(name, pabeable);
		return page.map(user -> new UserDTO(user));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> opt = userRepository.findById(id);
		User user = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User user = new User();
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		System.out.println("password - " + user.getPassword());
		user.getRoles().clear();
		Role role = roleRepository.findByAuthority(RoleType.ROLE_CLIENT);
		user.addRole(role);
		user = userRepository.save(user);
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO insertOperator(UserInsertDTO dto) {
		User user = new User();
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		System.out.println("password - " + user.getPassword());
		user.getRoles().clear();
		Role role = roleRepository.findByAuthority(RoleType.ROLE_OPERATOR);
		user.addRole(role);
		user = userRepository.save(user);
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO update(Long id, UserDTO dto) {
		try {
			User user = userRepository.getReferenceById(id);
			user.setFirstName(dto.getFirstName());
			user.setLastName(dto.getLastName());
			user.setEmail(dto.getEmail());
			user = userRepository.save(user);
			return new UserDTO(user);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional(propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		if(!userRepository.existsById(id)) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		try {
			userRepository.deleteById(id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	@Transactional(readOnly = true)
    public UserDTO getMe() {
        User entity = authService.authenticated();
        return new UserDTO(entity);
    }
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		List<UserDetailsProjection> result = userRepository.searchUserAndRolesByEmail(username);
		if (result.size() == 0) {
			throw new UsernameNotFoundException("Email not found");
		}
		User user = new User();
		user.setEmail(result.get(0).getUsername());
		user.setPassword(result.get(0).getPassword());
		for(UserDetailsProjection projection : result) {
			user.addRole(new Role(projection.getRoleId(), projection.getAuthority()));
		}
		return user;
	}
	
}
