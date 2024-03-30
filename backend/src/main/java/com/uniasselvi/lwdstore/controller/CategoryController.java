package com.uniasselvi.lwdstore.controller;

import com.uniasselvi.lwdstore.dto.CategoryDTO;
import com.uniasselvi.lwdstore.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/categorias")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<CategoryDTO>> findAllPaged(Pageable pageable){
        Page<CategoryDTO> categories =categoryService.findAllPaged(pageable);
        return ResponseEntity.ok().body(categories);
    }
}
