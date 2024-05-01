package com.uniasselvi.lwdstore.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.services.BrandService;
import com.uniasselvi.lwdstore.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/brands")
public class BrandController {
	
	@Autowired
	private BrandService brandService;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<BrandDTO>> findAllPagedByName(
			@RequestParam(name = "name", defaultValue = "")String name, Pageable pageable) {
		Page<BrandDTO> brands = brandService.findAllPagedByName(name, pageable);
		return ResponseEntity.ok().body(brands);
	}
	
	@GetMapping(value = "/list")
	public ResponseEntity<List<BrandDTO>> findAllPagedByName() {
		List<BrandDTO> brands = brandService.findAll();
		return ResponseEntity.ok().body(brands);
	}
	
	@GetMapping(value = "/{id}/products")
	public ResponseEntity<List<ProductDTO>> findProductsByBrand(@PathVariable Long id) {
		List<ProductDTO> products = productService.findProductsByBrand(id);
		return ResponseEntity.ok().body(products);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<BrandDTO> findById(@PathVariable Long id) {
		BrandDTO brand = brandService.findById(id);
		return ResponseEntity.ok().body(brand);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@PostMapping
	public ResponseEntity<BrandDTO> insert(@Valid @RequestBody BrandDTO dto) {
		dto = brandService.insert(dto);
		URI uri = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(dto.getId())
				.toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<BrandDTO> update(@PathVariable Long id,@Valid @RequestBody BrandDTO dto) {
		dto = brandService.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		brandService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
