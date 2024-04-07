package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Brand;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class BrandDTO {

    private Long id;
    @Size(min = 3, max = 80)
    @NotBlank(message = "nome deve ter entre 3 e 80 caracteres")
    private String name;
    @Size(min = 3, max = 80)
    @NotBlank(message = "URL da imagem não pode ser vazio")
    private String imageUrl;

    public BrandDTO() {
    }

    public BrandDTO(Long id, String name, String imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public BrandDTO(Brand brand) {
        this.id = brand.getId();
        this.name = brand.getName();
        this.imageUrl = brand.getImageUrl();
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
