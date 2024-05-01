package com.wdtechsolutions.toolstorepro.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.wdtechsolutions.toolstorepro.dto.OrderDTO;
import com.wdtechsolutions.toolstorepro.projections.ClientsWhoMostPurchase;
import com.wdtechsolutions.toolstorepro.projections.MostSoldProductsProjection;
import com.wdtechsolutions.toolstorepro.projections.SalesByDayProjection;
import com.wdtechsolutions.toolstorepro.projections.SalesByMonthProjection;
import com.wdtechsolutions.toolstorepro.services.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<Page<OrderDTO>> findAll(Pageable pageable) {
    	Page<OrderDTO> orders = orderService.findAllPaged(pageable);
    	return ResponseEntity.ok().body(orders);
    }
    
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CLIENT')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable Long id) {
        OrderDTO dto = orderService.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CLIENT','ROLE_OPERATOR')")
    @PostMapping
    public ResponseEntity<OrderDTO> insert(@Valid @RequestBody OrderDTO dto) {
        dto = orderService.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}/change-status")
    public ResponseEntity<OrderDTO> changeStatus(@PathVariable Long id, @RequestBody OrderDTO dto) {
        dto = orderService.changeStatus(id, dto);
        return ResponseEntity.ok().body(dto);
    }
    
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@GetMapping("/monthly")
    public ResponseEntity<Page<SalesByMonthProjection>> getMonthlySales(
            @RequestParam(value = "minDate", defaultValue = "")String minDate,
            @RequestParam(value = "maxDate", defaultValue = "")String maxDate,
    Pageable pageable) {
        Page<SalesByMonthProjection> salesByMonth = orderService.getTotalSalesByMonth(minDate, maxDate, pageable);
        return ResponseEntity.ok().body(salesByMonth);
    }
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@GetMapping("/daily")
    public ResponseEntity<Page<SalesByDayProjection>> getDailySales(
            @RequestParam(value = "minDate", defaultValue = "")String minDate,
            @RequestParam(value = "maxDate", defaultValue = "")String maxDate,
    Pageable pageable) {
        Page<SalesByDayProjection> salesByDay = orderService.getTotalSalesByDay(minDate, maxDate, pageable);
        return ResponseEntity.ok().body(salesByDay);
    }
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@GetMapping("/most-sold-products")
	public ResponseEntity<Page<MostSoldProductsProjection>> getMostSoldProducts(Pageable pageable) {
		Page<MostSoldProductsProjection> mostSoldProducts = orderService.getMostSoldProducts(pageable);
		return ResponseEntity.ok().body(mostSoldProducts);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	@GetMapping("/client-most-purchase")
	public ResponseEntity<Page<ClientsWhoMostPurchase>> getClientsWhoMostPurchase(Pageable pageable) {
		Page<ClientsWhoMostPurchase> clientsWhoMostPurchased = orderService.getClientsWhoMostPurchase(pageable);
		return ResponseEntity.ok().body(clientsWhoMostPurchased);
	}
}
