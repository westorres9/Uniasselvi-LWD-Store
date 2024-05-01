package com.wdtechsolutions.toolstorepro.dto;

import java.io.Serializable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmailDTO implements Serializable {
    private static final long serialVersionUID = 1L;

	@NotBlank
    @Email
    private String to;
    
    @NotBlank
    private String subject;
    
    @NotBlank
    private String body;

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
}