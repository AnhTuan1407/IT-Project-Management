package com.example.be.service.impl;


import com.example.be.entity.Topic;
import com.example.be.repository.TopicRepository;
import com.example.be.service.ITopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TopicServiceImpl implements ITopicService {
    @Autowired
    TopicRepository topicRepository;

    @Override
    public Topic saveTopic(Topic topic) {
        topicRepository.save(topic);
        return topic;
    }
//    @Override
//    public void saveTopic(String name, String introduce, String image, String content, Integer facultyId) {
//        topicRepository.saveTopic(name, introduce, image, content, facultyId);
//    }
}
