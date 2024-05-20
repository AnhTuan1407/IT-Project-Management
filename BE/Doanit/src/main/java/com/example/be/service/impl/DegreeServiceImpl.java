package com.example.be.service.impl;

import com.example.be.entity.Degree;
import com.example.be.repository.DegreeRepository;
import com.example.be.service.IDegreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DegreeServiceImpl implements IDegreeService {
    @Autowired
    private DegreeRepository degreeRepository;

    @Override
    public List<Degree> getAllDegree() {
        return degreeRepository.findAll();
    }

    @Override
    public Degree getDegreeById(int id) {
        return degreeRepository.getById(id);
    }
}
