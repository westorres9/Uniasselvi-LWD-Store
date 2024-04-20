package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.User;

public class ClienteDTO {

    private Long id;

    private String firstName;

    public ClienteDTO(Long id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }

    public ClienteDTO(User entity) {
        id = entity.getId();
        firstName = entity.getFirstName();
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }
}
