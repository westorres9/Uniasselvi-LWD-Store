package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT obj FROM Category obj " +
            "WHERE LOWER(obj.name) LIKE LOWER(CONCAT('%', :name ,'%'))")
    Page<Category> searchCategoriesPagedByName(String name, Pageable pageable);
}
