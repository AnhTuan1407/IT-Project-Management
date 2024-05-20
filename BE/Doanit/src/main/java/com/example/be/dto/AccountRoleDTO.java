package com.example.be.dto;

public class AccountRoleDTO {
    private Integer AccountRoleDTO;
    private Integer accountId;
    private Integer roleId;

    public AccountRoleDTO() {
    }

    public Integer getAccountRoleDTO() {
        return AccountRoleDTO;
    }

    public void setAccountRoleDTO(Integer accountRoleDTO) {
        this.AccountRoleDTO = accountRoleDTO;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
