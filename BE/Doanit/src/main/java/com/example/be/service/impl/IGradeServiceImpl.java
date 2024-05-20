package com.example.be.service.impl;
import com.example.be.entity.Grade;
import com.example.be.repository.GradeRepository;
import com.example.be.service.IGradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IGradeServiceImpl implements IGradeService {
    @Autowired
    GradeRepository gradeRepository;

    /**
     * Find All Grade
     */
    @Override
    public List<Grade> getAllGrade() {
        return gradeRepository.findAll();
    }
}
