package com.wdtechsolutions.toolstorepro.dto;

import java.io.Serializable;

import com.wdtechsolutions.toolstorepro.entities.Brand;

import jakarta.validation.constraints.NotEmpty;

public class BrandDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotEmpty(message = "Campo requerido")
	private String name;
	@NotEmpty(message = "Campo requerido")
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
