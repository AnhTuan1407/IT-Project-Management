package com.example.be.service.impl;

import com.example.be.entity.Role;
import com.example.be.repository.IRoleRepository;

import com.example.be.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;

    @Override
    public Role findByRoleName(String roleName) {
        return iRoleRepository.findByRoleName(roleName);
    }
}
