package com.wdtechsolutions.toolstorepro.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.wdtechsolutions.toolstorepro.dto.ProductDTO;
import com.wdtechsolutions.toolstorepro.entities.Brand;
import com.wdtechsolutions.toolstorepro.entities.Category;
import com.wdtechsolutions.toolstorepro.entities.Product;
import com.wdtechsolutions.toolstorepro.repositories.BrandRepository;
import com.wdtechsolutions.toolstorepro.repositories.CategoryRepository;
import com.wdtechsolutions.toolstorepro.repositories.ProductRepository;
import com.wdtechsolutions.toolstorepro.services.exceptions.DatabaseException;
import com.wdtechsolutions.toolstorepro.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private BrandRepository brandRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPagedByName(String name, Pageable pageable) {
		Page<Product> products = productRepository.searchAllPagedByName(name, pageable);
		return products.map(product -> new ProductDTO(product));
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		List<Product> list = productRepository.findAll();
		return list.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findProductsByCategory(Long categoryId) {
		List<Product> list = productRepository.searchProductsByCategory(categoryId);
		return list.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findProductsByBrand(Long brandId) {
		List<Product> list = productRepository.searchProductsByBrand(brandId);
		return list.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findProductsOnSaleOff() {
		List<Product> list = productRepository.searchProductsOnSaleOff();
		return list.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> opt = productRepository.findById(id);
		Product product = opt.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(product);
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product product = new Product();
		copyDtoToEntity(product, dto);
		product = productRepository.save(product);
		return new ProductDTO(product);
	}
	
	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product product = productRepository.getReferenceById(id);
			copyDtoToEntity(product, dto);
			product = productRepository.save(product);
			return new ProductDTO(product);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional(propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		if(!productRepository.existsById(id)) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		try {
			productRepository.deleteById(id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findSpecialSelectProducts(Long specialSelectId) {
		List<Product> products = productRepository.searchSpecialSelect(specialSelectId);
		return products.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
	}
	
	private void copyDtoToEntity(Product product, ProductDTO dto){
		product.setSku(dto.getSku());
		product.setName(dto.getName());
		product.setDescription(dto.getDescription());
		product.setSpecs(dto.getSpecs());
		product.setPrice(dto.getPrice());
		product.setImageUrl(dto.getImageUrl());
		product.setAvailable(dto.isAvailable());
		product.setSaleOff(dto.isSaleOff());
		if(!categoryRepository.existsById(dto.getCategory().getId())) {
			throw new DatabaseException("Category not found");
		}
		Category cat = categoryRepository.getReferenceById(dto.getCategory().getId());
		if(!brandRepository.existsById(dto.getBrand().getId())) {
			throw new DatabaseException("Brand not found");
		}
		product.setCategory(cat);
		Brand brand = brandRepository.getReferenceById(dto.getBrand().getId());
		product.setBrand(brand);
	}
}
