package com.uniasselvi.lwdstore.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.uniasselvi.lwdstore.repositories.PasswordRecoverRepository;
import com.uniasselvi.lwdstore.repositories.UserRepository;
import com.uniasselvi.lwdstore.services.exceptions.EmailException;
import com.uniasselvi.lwdstore.services.exceptions.ForbiddenException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uniasselvi.lwdstore.dto.EmailDTO;
import com.uniasselvi.lwdstore.dto.NewPasswordDTO;
import com.uniasselvi.lwdstore.dto.RecoverPasswordEmailDTO;
import com.uniasselvi.lwdstore.entities.PasswordRecover;
import com.uniasselvi.lwdstore.entities.User;

import jakarta.validation.Valid;

@Service
public class AuthService {
	
	@Autowired
	private PasswordRecoverRepository passwordRecoverRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;

	@Value("${email.password-recover.token.minutes}")
	private Long tokenMinutes;

	@Value("${email.password-recover.uri}")
	private String passwordRecoverURI;

	@Value("${spring.mail.username}")
	private String emailFrom;

	public void createRecoverToken(@Valid RecoverPasswordEmailDTO body) {
		User user = userRepository.findByEmail(body.getEmail());
		if (user == null) {
			throw new EmailException("Email not found");
		}

		PasswordRecover passwordRecover = new PasswordRecover();
		passwordRecover.setToken(UUID.randomUUID().toString());
		passwordRecover.setEmail(body.getEmail());
		passwordRecover.setExpiration(Instant.now().plusSeconds(tokenMinutes * 60L));

		passwordRecover = passwordRecoverRepository.save(passwordRecover);

		EmailDTO email = new EmailDTO();
		email.setTo(body.getEmail());
		email.setSubject("Recuperação de senha");

		String text = "Acesse o link para definir uma nova senha \n\n " + passwordRecoverURI
				+ passwordRecover.getToken();

		email.setBody(text);
		emailService.sendEmail(email);
	}



	@Transactional
	public void saveNewPassword(@Valid NewPasswordDTO body) {
		List<PasswordRecover> result = passwordRecoverRepository.searchValidTokens(body.getToken(), Instant.now());
		if (result.size() == 0) {
			throw new ResourceNotFoundException("Token invalido");
		}
		User user = userRepository.findByEmail(result.get(0).getEmail());
		user.setPassword(passwordEncoder.encode(body.getPassword()));
		user = userRepository.save(user);
	}
	
	protected User authenticated() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
			String username = jwtPrincipal.getClaim("username");
			return userRepository.findByEmail(username);
		} catch (Exception e) {
			throw new UsernameNotFoundException("Invalid user");
		}
	}
	
	public void ValidateSelfOrAdmin(long userId) {
        User me = authenticated();
        if(!me.hasRole("ROLE_ADMIN") && !me.getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }
    }
}
