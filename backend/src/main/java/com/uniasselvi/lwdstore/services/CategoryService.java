package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.CategoryDTO;
import com.uniasselvi.lwdstore.entities.Category;
import com.uniasselvi.lwdstore.repositories.CategoryRepository;
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
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAllPagedByName(String name, Pageable pageable){
        Page<Category> categories = categoryRepository.searchCategoriesPagedByName(name, pageable);
        return categories.map(category -> new CategoryDTO(category));
    }
    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id){
        Optional<Category> opt = categoryRepository.findById(id);
        Category category = opt.orElseThrow(()->new ResourceNotFoundException("categoria nâo encontrada"));
        return new CategoryDTO(category);
    }

    @Transactional
    public CategoryDTO insert (CategoryDTO dto){
        Category category =new Category ();
        category. setName(dto.getName());
        category =categoryRepository.save(category);
        return new CategoryDTO(category);
    }

    @Transactional
    public CategoryDTO update (Long id, CategoryDTO dto){
        try{
            Category category = categoryRepository.getReferenceById(id);
            category. setName(dto.getName());
            category =categoryRepository.save(category);
            return new CategoryDTO(category);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete (Long id){
        if (!categoryRepository.existsById(id)){
            throw new ResourceNotFoundException("Id não encontrado");
        }
        try{
            categoryRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw  new DatabaseException("violação de integridade referencial");
        }
    }
}
