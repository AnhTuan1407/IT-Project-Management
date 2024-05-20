package com.example.be.service;


import com.example.be.dto.sdi.ClientSdi;
import com.example.be.entity.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public interface ClientService {
    Boolean create(Integer idGroup,ArrayList<Student> students);
}
