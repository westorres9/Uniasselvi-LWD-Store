package com.uniasselvi.lwdstore.dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NewPasswordDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "Campo Obrigatório")
	private String token;
	@Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
	@NotBlank(message = "Campo Obrigatório")
	private String password;
	
	public NewPasswordDTO() {
	}

	public NewPasswordDTO(String token, String password) {
		this.token = token;
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
