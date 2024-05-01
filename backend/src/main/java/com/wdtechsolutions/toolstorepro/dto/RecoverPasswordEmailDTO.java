package com.wdtechsolutions.toolstorepro.dto;

import java.io.Serializable;

import jakarta.validation.constraints.Email;

public class RecoverPasswordEmailDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Email(message = "Favor enviar um email válido")
	private String email;
	
	public RecoverPasswordEmailDTO() {
	}

	public RecoverPasswordEmailDTO(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
