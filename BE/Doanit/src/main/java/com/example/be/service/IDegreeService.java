package com.example.be.service;

import com.example.be.entity.Degree;

import java.util.List;

public interface IDegreeService {
    List<Degree> getAllDegree();

    Degree getDegreeById(int id);
}
