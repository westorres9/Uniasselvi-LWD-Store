package com.wdtechsolutions.toolstorepro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wdtechsolutions.toolstorepro.entities.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
