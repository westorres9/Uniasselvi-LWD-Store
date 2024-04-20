package com.uniasselvi.lwdstore.services;

import com.uniasselvi.lwdstore.dto.OrderDTO;
import com.uniasselvi.lwdstore.dto.ProductDTO;
import com.uniasselvi.lwdstore.entities.Brand;
import com.uniasselvi.lwdstore.entities.Category;
import com.uniasselvi.lwdstore.entities.Order;
import com.uniasselvi.lwdstore.entities.Product;
import com.uniasselvi.lwdstore.repositories.BrandRepository;
import com.uniasselvi.lwdstore.repositories.CategoryRepository;
import com.uniasselvi.lwdstore.repositories.OrderRepository;
import com.uniasselvi.lwdstore.repositories.ProductRepository;
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
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public OrderDTO findById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
        return new OrderDTO(order);
    }
}
