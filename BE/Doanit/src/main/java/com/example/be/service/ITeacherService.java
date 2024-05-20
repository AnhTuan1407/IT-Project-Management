package com.example.be.service;

import com.example.be.dto.CreateUpdateTeacherDTO;
import com.example.be.dto.ITeacherDto;
import com.example.be.dto.ITeacherUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ITeacherService {
    void createTeacher(CreateUpdateTeacherDTO createUpdateTeacherDTO);
    ITeacherUpdateDTO getTeacherById(Integer id);
    void updateTeacher(CreateUpdateTeacherDTO createUpdateTeacherDTO);
    Page<ITeacherDto> getAllTeacher(String find, Pageable pageable);
    void deleteTeacher(Integer id);
}
