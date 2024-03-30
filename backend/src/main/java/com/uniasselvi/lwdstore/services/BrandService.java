package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.repositories.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public Page<BrandDTO> findAllPaged(Pageable pageable) {
        Page<Brand> brands = brandRepository.findAll(pageable);
        return brands.map(brand -> new BrandDTO(brand));
    }
}
