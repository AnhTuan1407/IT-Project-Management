package com.example.be.security;

import com.example.be.entity.Account;
import com.example.be.entity.AccountRole;
import com.example.be.repository.IAccountRepository;
import com.example.be.service.IAccountRoleSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPrincipleService implements UserDetailsService {
    @Autowired
    private IAccountRepository iAccountRepository;
    @Autowired
    private UserPrinciple userPrinciple ;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = iAccountRepository.findByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return userPrinciple.mapUserToUserPrinciple(account);
    }
}
