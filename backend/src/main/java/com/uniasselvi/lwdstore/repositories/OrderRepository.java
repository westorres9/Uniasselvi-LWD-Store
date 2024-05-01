package com.uniasselvi.lwdstore.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.uniasselvi.lwdstore.entities.Order;
import com.uniasselvi.lwdstore.projections.SalesByDayProjection;
import com.uniasselvi.lwdstore.projections.SalesByMonthProjection;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	
	@Query(value = "SELECT TO_CHAR(o.moment, 'YYYY-MM') AS Month, " +
            "SUM(oi.price * oi.quantity) AS totalSales " +
            "FROM tb_order o " +
            "INNER JOIN tb_order_item oi ON o.id = oi.order_id " +
            "WHERE o.moment BETWEEN :minDate AND :maxDate " +
            "GROUP BY TO_CHAR(o.moment, 'YYYY-MM') " +
            "ORDER BY TO_CHAR(o.moment, 'YYYY-MM')", nativeQuery = true)
	Page<SalesByMonthProjection> salesByMonth(LocalDate minDate, LocalDate maxDate, Pageable pageable);
	
	@Query(value = "SELECT TO_CHAR(o.moment, 'YYYY-MM-DD') AS Day, " +
            "SUM(oi.price * oi.quantity) AS TotalSales " +
            "FROM tb_order o " +
            "INNER JOIN tb_order_item oi ON o.id = oi.order_id " +
            "WHERE o.moment BETWEEN :minDate AND :maxDate " +
            "GROUP BY TO_CHAR(o.moment, 'YYYY-MM-DD') " +
            "ORDER BY TO_CHAR(o.moment, 'YYYY-MM-DD')",
     nativeQuery = true)
	Page<SalesByDayProjection> salesByDay(LocalDate minDate, LocalDate maxDate, Pageable pageable);
	
}
