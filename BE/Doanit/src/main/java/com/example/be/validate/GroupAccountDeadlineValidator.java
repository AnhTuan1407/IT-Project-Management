package com.example.be.validate;

import com.example.be.repository.GroupAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class GroupAccountDeadlineValidator {
    @Autowired
    GroupAccountRepository groupAccountRepository;
    public Map<String,String> dateValidate(LocalDateTime deadLine){
        Map<String,String> errors = new HashMap<>();
        if (deadLine==null){
            errors.put("errorDateGroup","Deadline không được để trống");
            return errors;
        }
        LocalDateTime currentDate = LocalDateTime.now();
        if (deadLine.isBefore(currentDate)){
            errors.put("errorDateGroup", "Deadline phải sau ngày hiện tại");
        }
        return errors;
    }

}
