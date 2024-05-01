package com.wdtechsolutions.toolstorepro.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.wdtechsolutions.toolstorepro.entities.Order;
import com.wdtechsolutions.toolstorepro.entities.OrderItem;
import com.wdtechsolutions.toolstorepro.entities.OrderStatus;

import jakarta.validation.constraints.NotEmpty;

public class OrderDTO {

    private Long id;
    private LocalDate moment;
    private OrderStatus status;

    private ClientDTO client;

    private PaymentDTO payment;
    @NotEmpty(message = "Deve ter pelo menos um item")
    private List<OrderItemDTO> items = new ArrayList<>();

    public OrderDTO() {
    }

    public OrderDTO(Long id, LocalDate moment, OrderStatus status, ClientDTO client, PaymentDTO payment) {
        this.id = id;
        this.moment = moment;
        this.status = status;
        this.client = client;
        this.payment = payment;
    }

    public OrderDTO(Order entity) {
        this.id = entity.getId();
        this.moment = entity.getMoment();
        this.status = entity.getStatus();
        this.client = new ClientDTO(entity.getClient());
        this.payment = (entity.getPayment() == null) ? null : new PaymentDTO(entity.getPayment());
        for (OrderItem item : entity.getItems()) {
            OrderItemDTO itemDTO = new OrderItemDTO(item);
            items.add(itemDTO);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getMoment() {
        return moment;
    }

    public void setMoment(LocalDate moment) {
        this.moment = moment;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public PaymentDTO getPayment() {
        return payment;
    }

    public void setPayment(PaymentDTO payment) {
        this.payment = payment;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public Double getTotal() {
        double total = 0;
        for (OrderItemDTO item : items)  {
            total += item.getSubTotal();
        }
        return total;
    }
}
