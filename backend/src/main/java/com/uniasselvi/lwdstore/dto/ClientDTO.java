package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.User;

public class ClientDTO {

    private Long id;
    private String name;

    public ClientDTO(){
    }

    public ClientDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ClientDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getFirstName() + " " + entity.getLastName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}