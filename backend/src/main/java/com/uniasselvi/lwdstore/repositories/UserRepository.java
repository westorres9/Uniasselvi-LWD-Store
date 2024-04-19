package com.uniasselvi.lwdstore.repositories;

import com.uniasselvi.lwdstore.entities.User;
import com.uniasselvi.lwdstore.projections.UserDetailsProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT obj FROM User obj " +
            "WHERE LOWER(obj.firstName) LIKE LOWER(CONCAT('%', :name ,'%'))" +
            "OR LOWER(obj.lastName) LIKE LOWER(CONCAT('%', :name ,'%'))")
    Page<User> searchUsersPagedByFirstNameOrLastName(String name, Pageable pageable);

    User findByEmail(String email);

    @Query(nativeQuery = true, value = """
            SELECT tb_user.email AS username, tb_user.password, tb_role.id AS roleId, tb_role.authority
            FROM tb_user
            INNER JOIN tb_user_role ON tb_user.id = tb_user_role.user_id
            INNER JOIN tb_role ON tb_role.id = tb_user_role.role_id
            WHERE tb_user.email = :email
    """)
    List<UserDetailsProjection> searchUserAndRolesByEmail(String email);
}
