package com.wdtechsolutions.toolstorepro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wdtechsolutions.toolstorepro.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	
	Role findByAuthority(String authority);
}
