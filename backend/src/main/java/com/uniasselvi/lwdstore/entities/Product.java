package com.uniasselvi.lwdstore.entities;

import java.util.Objects;

public class Product {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer unitsInStock;
    private boolean available;
    private boolean saleOff;

    private Category category;
    private Brand brand;

    public Product() {
    }

    public Product(long id, String name, String description, Double price, String imageUrl, Integer unitsInStock, boolean available, boolean saleOff) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.unitsInStock = unitsInStock;
        this.available = available;
        this.saleOff = saleOff;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product product)) return false;
        return id == product.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
