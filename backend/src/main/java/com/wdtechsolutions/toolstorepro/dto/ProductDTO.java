package com.wdtechsolutions.toolstorepro.dto;

import java.io.Serializable;

import com.wdtechsolutions.toolstorepro.entities.Product;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public class ProductDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotEmpty(message = "Campo requerido")
	private String sku;
	@NotEmpty(message = "Campo requerido")
	private String name;
	@NotEmpty(message = "Campo requerido")
	private String description;
	@NotEmpty(message = "Campo requerido")
	private String specs;
	@Positive(message = "Preço deve ser positivo")
	private Double price;
	@NotEmpty(message = "Campo requerido")
	private String imageUrl;
	private boolean available;
	private boolean saleOff;
	private BrandDTO brand;
	private CategoryDTO category;
	
	public ProductDTO() {
	}

	public ProductDTO(Long id, String sku, String name, String description, String specs, Double price, String imageUrl,
			boolean available, boolean saleOff, BrandDTO brand, CategoryDTO category) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.description = description;
		this.specs = specs;
		this.price = price;
		this.imageUrl = imageUrl;
		this.available = available;
		this.saleOff = saleOff;
		this.brand = brand;
		this.category = category;
	}
	
	public ProductDTO(Product product) {
		this.id = product.getId();
		this.sku = product.getSku();
		this.name = product.getName();
		this.description = product.getDescription();
		this.specs = product.getSpecs();
		this.price = product.getPrice();
		this.imageUrl = product.getImageUrl();
		this.available = product.isAvailable();
		this.saleOff = product.isSaleOff();
		this.brand = new BrandDTO(product.getBrand());
		this.category = new CategoryDTO(product.getCategory());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSpecs() {
		return specs;
	}

	public void setSpecs(String specs) {
		this.specs = specs;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public boolean isSaleOff() {
		return saleOff;
	}

	public void setSaleOff(boolean saleOff) {
		this.saleOff = saleOff;
	}

	public BrandDTO getBrand() {
		return brand;
	}

	public void setBrand(BrandDTO brand) {
		this.brand = brand;
	}

	public CategoryDTO getCategory() {
		return category;
	}

	public void setCategory(CategoryDTO category) {
		this.category = category;
	}
}
