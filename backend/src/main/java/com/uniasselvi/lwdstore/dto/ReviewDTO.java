package com.uniasselvi.lwdstore.dto;

import com.uniasselvi.lwdstore.entities.Review;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ReviewDTO {

    private Long id;
    @NotBlank(message = "nome deve ter entre 3 e 80 caracteres")
    private String comment;
    @NotNull(message = "Avaliação não pode ser nulo")
    @PositiveOrZero(message = "Valores permitidos entre 0 e 5")
    private Double rate;
    private Long userId;
    private Long productId;

    public ReviewDTO() {
    }

    public ReviewDTO(Long id, String comment, Double rate, Long userId, Long productId) {
        this.id = id;
        this.comment = comment;
        this.rate = rate;
        this.userId = userId;
        this.productId = productId;
    }

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.comment = review.getComment();
        this.rate = review.getRate();
        this.userId = review.getUser().getId();
        this.productId = review.getProduct().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
