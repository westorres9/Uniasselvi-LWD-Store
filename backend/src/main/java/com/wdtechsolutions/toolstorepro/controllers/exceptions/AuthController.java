package com.wdtechsolutions.toolstorepro.controllers.exceptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wdtechsolutions.toolstorepro.dto.NewPasswordDTO;
import com.wdtechsolutions.toolstorepro.dto.RecoverPasswordEmailDTO;
import com.wdtechsolutions.toolstorepro.services.AuthService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/recover-token")
	public ResponseEntity<Void> createRecoverToken(@Valid @RequestBody RecoverPasswordEmailDTO body) {
		authService.createRecoverToken(body);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/new-password")
	public ResponseEntity<Void> saveNewPassword(@Valid @RequestBody NewPasswordDTO body) {
		authService.saveNewPassword(body);
		return ResponseEntity.noContent().build();
	}
} 
