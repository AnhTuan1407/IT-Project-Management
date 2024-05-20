package com.example.be.dto;

import java.util.List;

public interface IInfoTopicDTO {
    Integer getInfoTopicRegisterId();
    String getTopicName();
    String getTopicContent();
    String getTopicImage();
    String getGroupName();
    List<String> getStudentNames();
}
