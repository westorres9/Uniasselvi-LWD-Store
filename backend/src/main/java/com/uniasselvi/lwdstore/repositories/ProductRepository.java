package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p" +
            " JOIN FETCH p.reviews WHERE p.id = :productId")
    Optional<Product> findByIdWithReviews(Long productId);
}
