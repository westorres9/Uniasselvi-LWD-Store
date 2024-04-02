package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
