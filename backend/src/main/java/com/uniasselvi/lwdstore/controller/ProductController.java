package com.uniasselvi.lwdstore.controller;

import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> findAllPaged(Pageable pageable) {
        Page<ProductDTO> page = productService.findAllPaged(pageable);
        return ResponseEntity.ok().body(page);
    }
}
