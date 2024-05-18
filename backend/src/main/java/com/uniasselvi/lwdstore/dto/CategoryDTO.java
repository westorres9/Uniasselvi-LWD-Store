package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Category;

import jakarta.validation.constraints.NotEmpty;

public class CategoryDTO {
	
	private Long id;
	@NotEmpty(message = "Campo requerido")
	private String name;
	@NotEmpty(message = "Campo requerido")
	private String imageUrl;
	
	public CategoryDTO() {
	}

	public CategoryDTO(Long id, String name, String imageUrl) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
	}
	
	public CategoryDTO(Category category) {
		this.id = category.getId();
		this.name = category.getName();
		this.imageUrl = category.getImageUrl();
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
