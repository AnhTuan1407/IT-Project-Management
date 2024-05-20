package com.example.be.service;

import com.example.be.entity.Topic;

public interface ITopicService {
//    void saveTopic(String name, String introduce, String image, String content, Integer facultyId);
    Topic saveTopic(Topic topic);
}
