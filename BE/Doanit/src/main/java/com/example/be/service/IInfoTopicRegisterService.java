package com.example.be.service;

import com.example.be.dto.IInfoTopicDTO;
import com.example.be.entity.InfoTopicRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IInfoTopicRegisterService {
    void registerInfoTopic(InfoTopicRegister infoTopicRegister);

    void setStatusApproval(Integer id);

    Page<InfoTopicRegister> getListTopicNotApproval(Integer idTeacher, Pageable pageable);

    IInfoTopicDTO getInfoTopicById(Integer infoTopicId);
}
