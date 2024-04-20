package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.ReviewDTO;
import com.uniasselvi.lwdstore.entities.Product;
import com.uniasselvi.lwdstore.entities.Review;
import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.repositories.ProductRepository;
import com.uniasselvi.lwdstore.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public ReviewDTO addReview(Long productId, ReviewDTO dto) {
        Review review = new Review();
        Product product = productRepository.getReferenceById(productId);
        User user = authService.authenticated();
        review.setProduct(product);
        review.setUser(user);
        review.setComment(dto.getComment());
        review.setRate(dto.getRate());
        review = reviewRepository.save(review);
        return new ReviewDTO(review);
    }
}
