package com.uniasselvi.lwdstore.entities;

public class Review {
    private Long id;
    private String comment;
    private Double rate;

    private User user;
    private Product product;

    public Review() {
    }

    public Review(Long id, String comment, Double rate, User user, Product product) {
        this.id = id;
        this.comment = comment;
        this.rate = rate;
        this.user = user;
        this.product = product;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
