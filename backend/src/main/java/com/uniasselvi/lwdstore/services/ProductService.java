package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.entities.Category;
import com.uniasselvi.lwdstore.entities.Product;
import com.uniasselvi.lwdstore.repositories.BrandRepository;
import com.uniasselvi.lwdstore.repositories.CategoryRepository;
import com.uniasselvi.lwdstore.repositories.ProductRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(Pageable pageable) {
        Page<Product> page = productRepository.findAll(pageable);
        return page.map(product -> new ProductDTO(product));
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        Optional<Product> optional = productRepository.findByIdWithReviews(id);
        Product product = optional.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
        return new ProductDTO(product, product.getReviews());
    }

    @Transactional
    public ProductDTO insert(ProductDTO dto) {
        Product product = new Product();
        copyDtoToEntity(product, dto);
        product = productRepository.save(product);
        return new ProductDTO(product);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public ProductDTO update(Long id, ProductDTO dto) {
        try {
            Product product = productRepository.getReferenceById(id);
            copyDtoToEntity(product, dto);
            product = productRepository.save(product);
            return new ProductDTO(product);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
    }

    public void delete(Long id) {
        if(!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
        try {
            productRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Violação de integridade referencial");
        }
    }

    private void copyDtoToEntity(Product product, ProductDTO dto) {
        product.setSku(dto.getSku());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setUnitsInStock(dto.getUnitsInStock());
        product.setAvailable(dto.isAvailable());
        product.setSaleOff(dto.isSaleOff());
        Category category = categoryRepository.getReferenceById(dto.getCategory().getId());
        product.setCategory(category);
        Brand brand = brandRepository.getReferenceById(dto.getBrand().getId());
        product.setBrand(brand);
    }
}
