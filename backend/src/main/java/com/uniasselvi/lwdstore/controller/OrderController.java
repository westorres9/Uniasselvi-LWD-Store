package com.uniasselvi.lwdstore.controller;

import com.uniasselvi.lwdstore.dto.OrderDTO;
import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.dto.ReviewDTO;
import com.uniasselvi.lwdstore.services.OrderService;
import com.uniasselvi.lwdstore.services.ProductService;
import com.uniasselvi.lwdstore.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable Long id) {
        OrderDTO dto = orderService.findById(id);
        return ResponseEntity.ok(dto);
    }

}
