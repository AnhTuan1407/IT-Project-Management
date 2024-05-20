package com.example.be.service.impl;

import com.example.be.entity.Faculty;
import com.example.be.repository.FacultyRepository;
import com.example.be.service.IFacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements IFacultyService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Override
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    @Override
    public Faculty getFacultyById(int id) {
        return facultyRepository.getById(id);
    }
}
