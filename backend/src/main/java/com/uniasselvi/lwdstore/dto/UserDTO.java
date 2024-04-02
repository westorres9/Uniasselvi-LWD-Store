package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    private String password;
    private String phoneNumber;
    private LocalDate birthDate;
    public UserDTO() {
    }

    public UserDTO(Long id, String firstName, String lastName, String email, String password, String phoneNumber, LocalDate birthDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
    }

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        this.phoneNumber = entity.getPhoneNumber();
        this.birthDate = entity.getBirthDate();
    }


    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }
}
