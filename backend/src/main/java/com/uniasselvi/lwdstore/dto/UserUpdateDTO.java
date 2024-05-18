package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.services.validation.UserUpdateValid;

@UserUpdateValid
public class UserUpdateDTO extends UserDTO {
	private static final long serialVersionUID = 1L;

	public UserUpdateDTO() {
		super();
	}
}
