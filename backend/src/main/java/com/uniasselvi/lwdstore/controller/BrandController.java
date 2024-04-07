package com.uniasselvi.lwdstore.controller;

import com.uniasselvi.lwdstore.dto.BrandDTO;
import com.uniasselvi.lwdstore.services.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public ResponseEntity<Page<BrandDTO>> findAllPagedByName(
            @RequestParam(name = "name", defaultValue = "")String name,
            Pageable pageable) {
        Page<BrandDTO> brands = brandService.findAllPagedByName(name,pageable);
        return ResponseEntity.ok().body(brands);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BrandDTO> findById(@PathVariable Long id) {
        BrandDTO brand = brandService.findById(id);
        return ResponseEntity.ok().body(brand);
    }

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

    @PutMapping(value = "/{id}")
    public ResponseEntity<BrandDTO> update(@PathVariable Long id,@Valid @RequestBody BrandDTO dto) {
        dto = brandService.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
