package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    @Query("SELECT obj FROM Brand obj " +
            "WHERE UPPER(obj.name) LIKE LOWER(CONCAT('%', :name ,'%'))")
    Page<Brand> searchBrandsPagedByName(String name, Pageable pageable);
}
