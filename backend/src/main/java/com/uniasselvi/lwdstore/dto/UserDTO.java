package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Role;
import com.uniasselvi.lwdstore.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class UserDTO {

    private Long id;
    @Size(min = 3, max = 80)
    @NotBlank(message = "O nome deve ter entre 3 e 80 caracteres")
    private String firstName;
    @Size(min = 3, max = 80)
    @NotBlank(message = "O sobrenome deve ter entre 3 e 80 caracteres")
    private String lastName;
    @Email(message = "Favor enviar um email válido")
    private String email;
    @Size(max = 11)
    @NotBlank(message = "Favor informar um número de telefone válido")
    private String phoneNumber;
    @PastOrPresent(message = "Data de nascimento não pode ser futura")
    private LocalDate birthDate;
    private List<RoleDTO> roles = new ArrayList<>();

    public UserDTO() {
    }

    public UserDTO(Long id, String firstName, String lastName, String email, String phoneNumber, LocalDate birthDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public List<RoleDTO> getRoles() {
        return roles;
    }
}
