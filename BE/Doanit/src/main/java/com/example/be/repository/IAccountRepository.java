package com.example.be.repository;

import com.example.be.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface IAccountRepository extends JpaRepository<Account,Integer> {

    @Query(value = "SELECT a.account_id,a.username,a.password FROM Account a WHERE a.username = :username", nativeQuery = true)
    Account findByUsername(@Param("username") String username);

    boolean existsByUsername(String userName);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Account a SET a.password = :pass WHERE a.username = :username")
    void changePassword(@Param("username") String username, @Param("pass") String pass);

}
