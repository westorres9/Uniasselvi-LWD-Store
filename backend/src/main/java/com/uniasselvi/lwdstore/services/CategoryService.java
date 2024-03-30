package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.CategoryDTO;
import com.uniasselvi.lwdstore.entities.Category;
import com.uniasselvi.lwdstore.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAllPaged(Pageable pageable){
        Page<Category> categories = categoryRepository.findAll(pageable);
        return categories.map(category -> new CategoryDTO(category));
    } 
}
