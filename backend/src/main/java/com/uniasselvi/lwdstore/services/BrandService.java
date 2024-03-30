package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.repositories.BrandRepository;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public Page<BrandDTO> findAllPaged(Pageable pageable) {
        Page<Brand> brands = brandRepository.findAll(pageable);
        return brands.map(brand -> new BrandDTO(brand));
    }

    @Transactional(readOnly = true)
    public BrandDTO findById(Long id) {
       Optional<Brand> opt =  brandRepository.findById(id);
       Brand brand = opt.orElseThrow(() -> new ResourceNotFoundException("Marca não encontrada"));
       return new BrandDTO(brand);
    }

    @Transactional
    public BrandDTO insert(BrandDTO dto) {
        Brand brand = new Brand();
        brand.setName(dto.getName());
        brand.setImageUrl(dto.getImageUrl());
        brand = brandRepository.save(brand);
        return new BrandDTO(brand);
    }

    @Transactional
    public BrandDTO update(Long id, BrandDTO dto) {
        try {
            Brand brand = brandRepository.getReferenceById(id);
            brand.setName(dto.getName());
            brand.setImageUrl(dto.getImageUrl());
            brand = brandRepository.save(brand);
            return new BrandDTO(brand);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id não encontrado");
        }
    }
}
