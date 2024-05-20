package com.example.be.service.impl;


import com.example.be.entity.Account;
import com.example.be.entity.AccountRole;
import com.example.be.repository.IAccountRoleRepository;
import com.example.be.service.IAccountRoleSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountRoleServiceImpl implements IAccountRoleSerivice {
    @Autowired
    IAccountRoleRepository accountRoleRepository;

    @Override
    public List<AccountRole> findAllByAccount(Account account) {
        return accountRoleRepository.findAllByAccount(account);
    }
}
