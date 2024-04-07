package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Product;
import com.uniasselvi.lwdstore.entities.Review;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;


public class ProductDTO {

    private Long id;
    @NotBlank(message = "código SKU não pode ser vazio")
    private String sku;
    @Size(min = 3, max = 80)
    @NotBlank(message = "O nome deve ter entre 3 e 80 caracteres")
    private String name;
    @Size(min = 3, max = 255)
    @NotBlank(message = "A descrição deve ter entre 3 e 255 caracteres")
    private String description;
    @Positive(message = "O preço deve ser positivo")
    private Double price;
    @NotBlank(message = "URL da imagem não pode ser vazio")
    private String imageUrl;
    @PositiveOrZero(message = "quantidade em estoque não pode ser negativo")
    private Integer unitsInStock;
    private boolean available;
    private boolean saleOff;
    @NotNull(message = "Categoria do produto não pode ser nulo")
    private CategoryDTO category;
    @NotNull(message = "Marca do produto não pode ser nulo")
    private BrandDTO brand;
    private List<ReviewDTO> reviews = new ArrayList<>();

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

    public ProductDTO(Product product, List<Review> reviews) {
        this(product);
        reviews.forEach(review -> this.reviews.add(new ReviewDTO(review)));
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

    public List<ReviewDTO> getReviews() {
        return reviews;
    }
}
