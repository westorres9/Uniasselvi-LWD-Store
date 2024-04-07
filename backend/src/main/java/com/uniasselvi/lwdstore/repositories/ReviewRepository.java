package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
