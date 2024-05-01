package com.wdtechsolutions.toolstorepro.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wdtechsolutions.toolstorepro.dto.EmailDTO;
import com.wdtechsolutions.toolstorepro.dto.NewPasswordDTO;
import com.wdtechsolutions.toolstorepro.dto.RecoverPasswordEmailDTO;
import com.wdtechsolutions.toolstorepro.entities.PasswordRecover;
import com.wdtechsolutions.toolstorepro.entities.User;
import com.wdtechsolutions.toolstorepro.repositories.PasswordRecoverRepository;
import com.wdtechsolutions.toolstorepro.repositories.UserRepository;
import com.wdtechsolutions.toolstorepro.services.exceptions.EmailException;
import com.wdtechsolutions.toolstorepro.services.exceptions.ForbiddenException;
import com.wdtechsolutions.toolstorepro.services.exceptions.ResourceNotFoundException;

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
