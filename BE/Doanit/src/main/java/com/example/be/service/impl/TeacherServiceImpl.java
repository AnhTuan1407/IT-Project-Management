package com.example.be.service.impl;

import com.example.be.dto.CreateUpdateTeacherDTO;
import com.example.be.dto.ITeacherDto;
import com.example.be.dto.ITeacherUpdateDTO;
import com.example.be.repository.TeacherRepository;
import com.example.be.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceImpl implements ITeacherService {

    @Autowired
    private TeacherRepository teacherRepository;


    @Override
    public void createTeacher(CreateUpdateTeacherDTO createUpdateTeacherDTO) {
        teacherRepository.createTeacher(createUpdateTeacherDTO.getAddress(),createUpdateTeacherDTO.getAvatar(), createUpdateTeacherDTO.getDateOfBirth(), createUpdateTeacherDTO.getEmail(), createUpdateTeacherDTO.getName(), createUpdateTeacherDTO.getPhone(),createUpdateTeacherDTO.getDegreeId(),createUpdateTeacherDTO.getFacultyId(),createUpdateTeacherDTO.getGender(),createUpdateTeacherDTO.getAccountId());
    }

    @Override
    public ITeacherUpdateDTO getTeacherById(Integer id) {
        return teacherRepository.getTeacherById(id);
    }

    @Override
    public void updateTeacher(CreateUpdateTeacherDTO createUpdateTeacherDTO) {
        teacherRepository.updateTeacher
                (createUpdateTeacherDTO.getAddress(),createUpdateTeacherDTO.getAvatar(), createUpdateTeacherDTO.getDateOfBirth(), createUpdateTeacherDTO.getEmail(), createUpdateTeacherDTO.getName(), createUpdateTeacherDTO.getPhone(),createUpdateTeacherDTO.getDegreeId(),createUpdateTeacherDTO.getFacultyId(),createUpdateTeacherDTO.getGender(),createUpdateTeacherDTO.getTeacherId());
    }
    @Override
    public Page<ITeacherDto> getAllTeacher(String find, Pageable pageable) {
        return teacherRepository.getAllTeacher(find, pageable);
    }

    @Override
    public void deleteTeacher(Integer id) {
        teacherRepository.deleteTeacher(id);
    }
}
