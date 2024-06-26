package com.uniasselvi.lwdstore.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniasselvi.lwdstore.entities.Newsletter;
@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long>{

}
