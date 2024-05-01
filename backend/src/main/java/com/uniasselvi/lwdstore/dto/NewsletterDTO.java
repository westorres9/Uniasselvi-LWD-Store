package com.uniasselvi.lwdstore.dto;

import java.io.Serializable;

import com.uniasselvi.lwdstore.entities.Newsletter;

public class NewsletterDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String email;
	
	public NewsletterDTO() {
	}

	public NewsletterDTO(Long id, String email) {
		this.id = id;
		this.email = email;
	}
	
	public NewsletterDTO(Newsletter newsletter) {
		this.id = newsletter.getId();
		this.email = newsletter.getEmail();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
