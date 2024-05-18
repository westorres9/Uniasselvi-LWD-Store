package com.uniasselvi.lwdstore.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.uniasselvi.lwdstore.entities.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("SELECT obj FROM Product obj "
			+ "WHERE LOWER(obj.name) LIKE LOWER(CONCAT('%', :name ,'%'))")
	Page<Product> searchAllPagedByName(String name, Pageable pageable);
	
	@Query("SELECT obj FROM Product obj "
			+ "JOIN FETCH Category cat "
			+ "ON obj.category.id = cat.id "
			+ "WHERE obj.category.id = :categoryId")
	List<Product> searchProductsByCategory(Long categoryId);
	
	@Query("SELECT obj FROM Product obj "
			+ "JOIN FETCH Brand brand "
			+ "ON obj.brand.id = brand.id "
			+ "WHERE obj.brand.id = :brandId")
	List<Product> searchProductsByBrand(Long brandId);
	
	@Query("SELECT obj FROM Product obj "
			+ "WHERE obj.saleOff = true")
	List<Product> searchProductsOnSaleOff();
	
    @Query("SELECT p FROM Product p " +
            "JOIN p.specialSelect ss " +
            "WHERE ss.id = :specialSelectId")
	List<Product> searchSpecialSelect(Long specialSelectId);
}
