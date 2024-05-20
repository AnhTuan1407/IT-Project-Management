package com.example.be.service.impl;


import com.example.be.dto.DataMailDTO;
import com.example.be.dto.sdi.ClientSdi;
import com.example.be.entity.Student;
import com.example.be.service.ClientService;
import com.example.be.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
@Service
public class ClientImpl implements ClientService {
   @Autowired
   private MailService mailService;

    @Override
    public Boolean create(Integer idGroup,ArrayList<Student> students) {
        //xu ly nghiep vu truoc khi tao thong tin nguoi dung
        try {
            for(Student s:students){
                DataMailDTO dataMail= new DataMailDTO();
                dataMail.setTo(s.getEmail());
                dataMail.setSubject("Test Mail");
                Map<String, Object> props= new HashMap<>();
                props.put("name",s.getName());
                props.put("username",s.getName());
                props.put("idStudent",s.getStudentId());
                props.put("idGroup",idGroup);
                dataMail.setProps(props);
                mailService.sentHTMLMail(dataMail,"client");
            }
            return true;
        }catch(Exception exp){
            exp.getMessage();
            System.out.println(exp.getMessage());
        }
        return false;
    }
}
