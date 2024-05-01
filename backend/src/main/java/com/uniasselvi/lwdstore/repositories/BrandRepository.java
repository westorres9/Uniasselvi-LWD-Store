package com.uniasselvi.lwdstore.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.uniasselvi.lwdstore.entities.Brand;
@Repository
public interface BrandRepository extends JpaRepository<Brand, Long>{
	
	@Query("SELECT obj FROM Brand obj "
			+ "WHERE LOWER(obj.name) LIKE LOWER(CONCAT('%', :name ,'%'))")
	Page<Brand> searchAllPagedByName(String name, Pageable pageable);
}
