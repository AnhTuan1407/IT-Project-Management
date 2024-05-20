package com.example.be.validate;

import com.example.be.dto.GroupAccountDTO;
import com.example.be.entity.GroupAccount;
import com.example.be.repository.GroupAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GroupAccountValidator {
    @Autowired
    GroupAccountRepository groupAccountRepository;


    public Map<String, String> validate(GroupAccountDTO groupAccountDTO) {
        Map<String, String> errors = new HashMap<>();
        List<GroupAccount> groupAccounts = groupAccountRepository.findByName(groupAccountDTO.getName());
        if (groupAccountDTO.getName() == null) {
            errors.put("errorNameGroupNull", "Tên không được để trống");
        }
        if (!groupAccounts.isEmpty()) {
            errors.put("errorNameGroupDuplicate", "Tên không được trùng");

        }
        if (groupAccountDTO.getName().equals("")) {
            errors.put("errorNameGroupBlank", "Tên không được là ký tự trắng");
        }
        if (groupAccountDTO.getName().length() > 255) {
            errors.put("errorNameGroupMax", "Tên không được quá 255 ký tự");
        }
//    if (groupAccountRepository.findByName(groupAccountDTO.getName())!=null){
//        errors.put("errorNameGroup","Tên đã được sử dụng");
//    }
        return errors;
    }

}
