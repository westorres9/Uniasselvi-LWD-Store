package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT obj FROM User obj " +
            "WHERE LOWER(obj.firstName) LIKE LOWER(CONCAT('%', :name ,'%'))" +
            "OR LOWER(obj.lastName) LIKE LOWER(CONCAT('%', :name ,'%'))")
    Page<User> searchUsersPagedByFirstNameOrLastName(String name, Pageable pageable);

    User findByEmail(String email);
}
