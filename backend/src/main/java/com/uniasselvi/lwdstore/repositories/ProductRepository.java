package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT obj FROM Product obj " +
            "WHERE UPPER(obj.name) LIKE LOWER(CONCAT('%', :name ,'%'))")
    Page<Product> searchProductsPagedByName(String name, Pageable pageable);

    @Query("SELECT p FROM Product p" +
            " JOIN FETCH p.reviews WHERE p.id = :productId")
    Optional<Product> findByIdWithReviews(Long productId);
}
