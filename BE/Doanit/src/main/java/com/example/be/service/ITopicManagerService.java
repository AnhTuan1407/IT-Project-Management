package com.example.be.service;

import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.dto.TopicProcessDTO;
import com.example.be.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface ITopicManagerService {
    Page<Topic> findAllTopic(Pageable pageable);

    Page<Topic> findAllTopicByName(String name, Pageable pageable);

    Topic findByIdTopic(Integer id);

    void topicCancel(Integer id);

    void deleteTopic(Integer id);

    void createTopicProcess(TopicProcessDTO topicProcessDTO);

    void sendStudent(InfoTopicRegisterDTO infoTopicRegisterDTO) throws MessagingException, UnsupportedEncodingException;

    void sendStudentApproval(InfoTopicRegisterDTO infoTopicRegisterDTO) throws MessagingException, UnsupportedEncodingException;
}
