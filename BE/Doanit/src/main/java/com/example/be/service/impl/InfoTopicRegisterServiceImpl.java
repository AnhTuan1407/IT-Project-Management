package com.example.be.service.impl;

import com.example.be.dto.IInfoTopicDTO;
import com.example.be.entity.InfoTopicRegister;
import com.example.be.repository.IInfoTopicRegisterRepository;
import com.example.be.repository.InfoTopicRegisterRepository;
import com.example.be.service.IInfoTopicRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class InfoTopicRegisterServiceImpl implements IInfoTopicRegisterService {
    @Autowired
    InfoTopicRegisterRepository infoTopicRegisterRepository;

    @Autowired
    IInfoTopicRegisterRepository iInfoTopicRegisterRepository;

    @Override
    public void registerInfoTopic(InfoTopicRegister infoTopicRegister) {
        infoTopicRegisterRepository.save(infoTopicRegister);
    }

    @Override
    public Page<InfoTopicRegister> getListTopicNotApproval(Integer idTeacher, Pageable pageable) {
        return iInfoTopicRegisterRepository.findAllTopicNotApprovalByTeacherId(idTeacher, pageable);
    }
    @Override
    public void setStatusApproval(Integer id) {
        iInfoTopicRegisterRepository.approval(true, id);
    }

    @Override
    public IInfoTopicDTO getInfoTopicById(Integer infoTopicId) {
        return iInfoTopicRegisterRepository.getInfoTopicById(infoTopicId);
    }
}
