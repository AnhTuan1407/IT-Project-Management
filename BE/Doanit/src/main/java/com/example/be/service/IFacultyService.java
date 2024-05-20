package com.example.be.service;

import com.example.be.entity.Faculty;

import java.util.List;

public interface IFacultyService {
    List<Faculty> getAllFaculty();

    Faculty getFacultyById(int id);

}
