package com.wdtechsolutions.toolstorepro.dto;

import com.wdtechsolutions.toolstorepro.services.validation.UserInsertValid;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@UserInsertValid
public class UserInsertDTO extends UserDTO {
	private static final long serialVersionUID = 1L;
	@Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
	@NotEmpty(message = "Campo obrigatório")
	private String password;
	
	
	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
