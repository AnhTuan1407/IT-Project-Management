package com.example.be.service.impl;

import com.example.be.dto.IGetTeacherByIdDTO;
import com.example.be.dto.IRegisterTeacherDTO;
import com.example.be.repository.IRegisterTeacherRepository;
import com.example.be.service.IRegisterTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
@Service
public class RegisterTeacherImpl implements IRegisterTeacherService {
    @Autowired
    private IRegisterTeacherRepository iRegisterTeacherRepository;
    @Override
    public IGetTeacherByIdDTO getTeacherById(Integer teacherId) {
        return iRegisterTeacherRepository.getTeacherById(teacherId);
    }

    @Override
    @Transactional
    public void registerTeacher(Integer teacherId, Integer groupId) {
        iRegisterTeacherRepository.registerTeacher(teacherId,groupId);
    }

    @Override
    public Page<IRegisterTeacherDTO> getListTeacherRegistered(Pageable pageable) {
        return iRegisterTeacherRepository.getListTeacherRegistered(pageable) ;
    }
}
