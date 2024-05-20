package com.example.be.service;

import com.example.be.dto.IGetTeacherByIdDTO;
import com.example.be.dto.IRegisterTeacherDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface IRegisterTeacherService {
    IGetTeacherByIdDTO getTeacherById(Integer teacherId);
    void registerTeacher(Integer teacherId, Integer groupId);

    Page<IRegisterTeacherDTO> getListTeacherRegistered(Pageable pageable);
}
