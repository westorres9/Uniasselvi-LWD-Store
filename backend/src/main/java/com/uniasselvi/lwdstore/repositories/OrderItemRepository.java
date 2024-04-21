package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.Order;
import com.uniasselvi.lwdstore.entities.OrderItem;
import com.uniasselvi.lwdstore.entities.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
