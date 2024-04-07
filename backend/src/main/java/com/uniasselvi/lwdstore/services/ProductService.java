package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.entities.Product;
import com.uniasselvi.lwdstore.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(Pageable pageable) {
        Page<Product> page = productRepository.findAll(pageable);
        return page.map(product -> new ProductDTO(product));
    }
}
