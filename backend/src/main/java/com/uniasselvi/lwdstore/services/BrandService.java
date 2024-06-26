package com.uniasselvi.lwdstore.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.uniasselvi.lwdstore.repositories.BrandRepository;
import com.uniasselvi.lwdstore.services.exceptions.DatabaseException;
import com.uniasselvi.lwdstore.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.entities.Brand;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BrandService {
	
	@Autowired
	private BrandRepository brandRepository;
	
	@Transactional(readOnly = true)
	public Page<BrandDTO> findAllPagedByName(String name, Pageable pageable) {
		Page<Brand> brands = brandRepository.searchAllPagedByName(name, pageable);
		return brands.map(brand -> new BrandDTO(brand));
	}
	
	@Transactional(readOnly = true)
	public List<BrandDTO> findAll() {
		List<Brand> list = brandRepository.findAll();
		return list.stream().map(item -> new BrandDTO(item)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public BrandDTO findById(Long id) {
		Optional<Brand> opt = brandRepository.findById(id);
		Brand brand = opt.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
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
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional(propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		if(!brandRepository.existsById(id)) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		try {
			brandRepository.deleteById(id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
