package com.wdtechsolutions.toolstorepro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wdtechsolutions.toolstorepro.entities.OrderItem;
import com.wdtechsolutions.toolstorepro.entities.OrderItemPK;
import com.wdtechsolutions.toolstorepro.projections.ClientsWhoMostPurchase;
import com.wdtechsolutions.toolstorepro.projections.MostSoldProductsProjection;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
	
	@Query(value = "SELECT NEW com.wdtechsolutions.toolstorepro.projections.MostSoldProductsProjectionImpl(p.name as productName, SUM(oi.quantity) as totalQuantity) "
			+ "FROM OrderItem oi "
			+ "JOIN Product p "
			+ "ON oi.id.product.id = p.id "
			+ "GROUP BY p.name "
			+ "ORDER BY totalQuantity DESC")
	Page<MostSoldProductsProjection> mostSoldProducts(Pageable pageable);
	
	@Query(value = "SELECT NEW com.wdtechsolutions.toolstorepro.projections.ClientsWhoMostPurchaseImpl(u.firstName as client, SUM(oi.quantity * oi.price) as totalPurchased) "
			+ "FROM Order o "
			+ "JOIN OrderItem oi ON o.id = oi.id.order.id "
			+ "JOIN User u ON o.client.id = u.id "
			+ "GROUP BY u.firstName "
			+ "ORDER BY totalPurchased DESC")
	Page<ClientsWhoMostPurchase> clientsWhoMostPurchase(Pageable pageable);
}
