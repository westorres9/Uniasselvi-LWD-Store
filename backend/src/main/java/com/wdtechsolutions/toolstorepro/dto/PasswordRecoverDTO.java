package com.wdtechsolutions.toolstorepro.dto;

import java.io.Serializable;
import java.time.Instant;

import com.wdtechsolutions.toolstorepro.entities.PasswordRecover;

public class PasswordRecoverDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String token;
	private String email;
	private Instant expiration;

	public PasswordRecoverDTO(Long id, String token, String email, Instant expiration) {
		this.id = id;
		this.token = token;
		this.email = email;
		this.expiration = expiration;
	}

	public PasswordRecoverDTO() {
	}

	public PasswordRecoverDTO(PasswordRecover passwordRecover) {
		this.id = passwordRecover.getId();
		this.token = passwordRecover.getToken();
		this.email = passwordRecover.getEmail();
		this.expiration = passwordRecover.getExpiration();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Instant getExpiration() {
		return expiration;
	}

	public void setExpiration(Instant expiration) {
		this.expiration = expiration;
	}

}
