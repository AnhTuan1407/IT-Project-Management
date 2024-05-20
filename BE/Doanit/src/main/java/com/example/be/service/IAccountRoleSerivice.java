package com.example.be.service;

import com.example.be.entity.Account;
import com.example.be.entity.AccountRole;

import java.util.List;

public interface IAccountRoleSerivice {
    List<AccountRole> findAllByAccount(Account account);

}
