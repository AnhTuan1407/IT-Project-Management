package com.example.be.repository;

import com.example.be.entity.InfoTopicRegister;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface InfoTopicRegisterRepository extends JpaRepository <InfoTopicRegister,Integer> {
}
