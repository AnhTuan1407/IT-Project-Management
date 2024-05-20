package com.example.be.security;

import com.example.be.entity.Account;
import com.example.be.entity.AccountRole;
import com.example.be.service.IAccountRoleSerivice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Component
@Data
public class UserPrinciple implements UserDetails {

    private Integer userId;
    private String userName;
    private String password;
    private Collection<? extends GrantedAuthority> roles;

    @Autowired
    private IAccountRoleSerivice accountRoleSerivice;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }



    public UserPrinciple mapUserToUserPrinciple(Account account ) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        List<AccountRole> accountRoleList = accountRoleSerivice.findAllByAccount(account);

        if (accountRoleList != null) {
            for (AccountRole accountRole : accountRoleList) {
                GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(accountRole.getRole().getRoleName().toString());
                authorities.add(grantedAuthority);
            }
        }
        /* SimpleGrantedAuthority là một lớp cơ bản trong Spring Security, nó cung cấp một cách đơn giản để tạo ra một GrantedAuthority*/
        return new UserPrinciple(account.getAccountId(), account.getUsername(), account.getPassword(), authorities);
    }

    public UserPrinciple(Integer userId, String userName, String password, Collection<? extends GrantedAuthority> roles) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.roles = roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
