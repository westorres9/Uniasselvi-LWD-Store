package com.wdtechsolutions.toolstorepro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wdtechsolutions.toolstorepro.entities.Newsletter;
@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long>{

}
