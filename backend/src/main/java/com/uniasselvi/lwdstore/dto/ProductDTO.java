package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.entities.Category;
import com.uniasselvi.lwdstore.entities.Product;


public class ProductDTO {

    private Long id;
    private String sku;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer unitsInStock;
    private boolean available;
    private boolean saleOff;
    private CategoryDTO category;
    private BrandDTO brand;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String sku, String name, String description, Double price, String imageUrl, Integer unitsInStock, boolean available, boolean saleOff, CategoryDTO category, BrandDTO brand) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.unitsInStock = unitsInStock;
        this.available = available;
        this.saleOff = saleOff;
        this.category = category;
        this.brand = brand;
    }

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.sku = product.getSku();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.imageUrl = product.getImageUrl();
        this.unitsInStock = product.getUnitsInStock();
        this.available = product.isAvailable();
        this.saleOff = product.isSaleOff();
        this.category = new CategoryDTO(product.getCategory());
        this.brand = new BrandDTO(product.getBrand());
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

    public Integer getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(Integer unitsInStock) {
        this.unitsInStock = unitsInStock;
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

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public BrandDTO getBrand() {
        return brand;
    }

    public void setBrand(BrandDTO brand) {
        this.brand = brand;
    }
}
