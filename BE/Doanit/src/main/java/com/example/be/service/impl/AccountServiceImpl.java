package com.example.be.service.impl;


import com.example.be.entity.Account;
import com.example.be.repository.IAccountRepository;
import com.example.be.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements IAccountService {

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public Account getAccountById(Integer idAccount) {
        return accountRepository.findById(idAccount).orElse(null);
    }


    @Override
    public void changePassword(Account account) {
        accountRepository.changePassword(account.getUsername(),account.getPassword());
    }

    @Override
    public Account registerAccount(Account account) {
        return accountRepository.save(account);
    }
}
