package com.example.be.service;

import com.example.be.entity.Role;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Transactional
public interface IRoleService {
    Role findByRoleName(String roleName);

}
