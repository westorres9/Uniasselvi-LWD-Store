package com.uniasselvi.lwdstore.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniasselvi.lwdstore.entities.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
