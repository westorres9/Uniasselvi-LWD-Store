package com.wdtechsolutions.toolstorepro.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wdtechsolutions.toolstorepro.dto.OrderDTO;
import com.wdtechsolutions.toolstorepro.dto.OrderItemDTO;
import com.wdtechsolutions.toolstorepro.entities.Order;
import com.wdtechsolutions.toolstorepro.entities.OrderItem;
import com.wdtechsolutions.toolstorepro.entities.OrderStatus;
import com.wdtechsolutions.toolstorepro.entities.Payment;
import com.wdtechsolutions.toolstorepro.entities.Product;
import com.wdtechsolutions.toolstorepro.entities.User;
import com.wdtechsolutions.toolstorepro.projections.ClientsWhoMostPurchase;
import com.wdtechsolutions.toolstorepro.projections.MostSoldProductsProjection;
import com.wdtechsolutions.toolstorepro.projections.SalesByDayProjection;
import com.wdtechsolutions.toolstorepro.projections.SalesByMonthProjection;
import com.wdtechsolutions.toolstorepro.repositories.OrderItemRepository;
import com.wdtechsolutions.toolstorepro.repositories.OrderRepository;
import com.wdtechsolutions.toolstorepro.repositories.PaymentRepository;
import com.wdtechsolutions.toolstorepro.repositories.ProductRepository;
import com.wdtechsolutions.toolstorepro.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AuthService authService;
    
    @Transactional(readOnly = true)
    public Page<OrderDTO> findAllPaged(Pageable pageable) {
    	Page<Order> orders = orderRepository.findAll(pageable);
    	return orders.map(item -> new OrderDTO(item));
    }

    @Transactional(readOnly = true)
    public OrderDTO findById(Long id) {
        Optional<Order> opt = orderRepository.findById(id);
        Order order = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not Found"));
        authService.ValidateSelfOrAdmin(order.getClient().getId());
        return new OrderDTO(order);
    }

    @Transactional
    public  OrderDTO insert(OrderDTO dto) {
        Order order = new Order();
        order.setMoment(LocalDate.now());
        order.setStatus(OrderStatus.PENDENTE);
        User user = authService.authenticated();
        order.setClient(user);
        for (OrderItemDTO itemDTO : dto.getItems()) {
            Product product = productRepository.getReferenceById(itemDTO.getProductId());
            OrderItem item = new OrderItem(order, product,product.getPrice(),itemDTO.getQuantity());
            order.getItems().add(item);
        }
        orderRepository.save(order);
        orderItemRepository.saveAll(order.getItems());

        return new OrderDTO(order);
    }

    @Transactional
    public  OrderDTO changeStatus(Long id, OrderDTO dto) {
        try {
            Order order = orderRepository.getReferenceById(id);
            System.out.println(dto.getStatus());
            order.setStatus(dto.getStatus());
            orderRepository.save(order);
            if(order.getStatus().equals(OrderStatus.PAGO)) {
            	Payment payment = paymentRepository.getReferenceById(id);
            	if(payment != null) {
            		paymentRepository.deleteById(id);
            		payment = new Payment();
            		payment.setMoment(Instant.now());
                	payment.setOrder(order);
                	order.setPayment(payment);
            	}
            	payment = new Payment();
            	payment.setMoment(Instant.now());
            	payment.setOrder(order);
            	order.setPayment(payment);
            	payment = paymentRepository.save(payment);
            }
            if(order.getStatus().equals(OrderStatus.CANCELADO)) {
            	paymentRepository.deleteById(id);
            	order.setPayment(null);
            }
            order = orderRepository.save(order);
            return new OrderDTO(order);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Entity not found");
        }
    }
    
    @Transactional(readOnly = true)
	public Page<SalesByMonthProjection> getTotalSalesByMonth(String minDate, String maxDate, Pageable pageable) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(1024) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
		Page<SalesByMonthProjection> salesByMonth = orderRepository.salesByMonth(min, max, pageable);
		return salesByMonth;
	}

	@Transactional(readOnly = true)
	public Page<SalesByDayProjection> getTotalSalesByDay(String minDate, String maxDate, Pageable pageable) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(1024) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
		Page<SalesByDayProjection> salesByDay = orderRepository.salesByDay(min, max, pageable);
		return salesByDay;
	}

	@Transactional(readOnly = true)
	public Page<MostSoldProductsProjection> getMostSoldProducts(Pageable pageable) {
		Page<MostSoldProductsProjection> mostSoldProducts = orderItemRepository.mostSoldProducts(pageable);
		return mostSoldProducts;
	}

	@Transactional(readOnly = true)
	public Page<ClientsWhoMostPurchase> getClientsWhoMostPurchase(Pageable pageable) {
		Page<ClientsWhoMostPurchase> clientsWhoMostPurchase = orderItemRepository.clientsWhoMostPurchase(pageable);
		return clientsWhoMostPurchase;
	}
}
