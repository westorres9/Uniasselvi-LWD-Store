package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.User;

public class ClientDTO {

    private Long id;

    private String firstName;

    public ClientDTO(Long id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }

    public ClientDTO(User entity) {
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
