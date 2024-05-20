package com.example.be.dto;

import com.example.be.entity.Topic;

import java.util.List;

public class InfoTopicRegisterDTO {
    private Integer infoTopicRegisterId;
    private Topic topic;
    private Boolean status;
    private Boolean statusComplete;
    private Boolean topicCancel;
    private String descriptionURL;
    private Integer topicId;
    private Integer groupAccountId;

    private TeacherCreateDTO teacher;
    private String messageCancel;
    private String url;

    private List<StudentDTO> studentList;
    private String deadline;
    private List<TopicProcessDTO> topicProcessList;

    public InfoTopicRegisterDTO() {
    }

    public Integer getInfoTopicResgitor() {
        return infoTopicRegisterId;
    }

    public void setInfoTopicResgitor(Integer infoTopicResgitor) {
        this.infoTopicRegisterId = infoTopicResgitor;
    }
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Integer getInfoTopicRegisterId() {
        return infoTopicRegisterId;
    }

    public void setInfoTopicRegisterId(Integer infoTopicRegisterId) {
        this.infoTopicRegisterId = infoTopicRegisterId;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getStatusComplete() {
        return statusComplete;
    }

    public void setStatusComplete(Boolean statusComplete) {
        this.statusComplete = statusComplete;
    }

    public Boolean getTopicCancel() {
        return topicCancel;
    }

    public void setTopicCancel(Boolean topicCancel) {
        this.topicCancel = topicCancel;
    }

    public String getDescriptionURL() {
        return descriptionURL;
    }

    public void setDescriptionURL(String descriptionURL) {
        this.descriptionURL = descriptionURL;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Integer getGroupAccountId() {
        return groupAccountId;
    }

    public void setGroupAccountId(Integer groupAccountId) {
        this.groupAccountId = groupAccountId;
    }

    public TeacherCreateDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherCreateDTO teacher) {
        this.teacher = teacher;
    }

    public String getMessageCancel() {
        return messageCancel;
    }

    public void setMessageCancel(String messageCancel) {
        this.messageCancel = messageCancel;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<StudentDTO> getStudentList() {
        return studentList;
    }

    public void setStudentList(List<StudentDTO> studentList) {
        this.studentList = studentList;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public List<TopicProcessDTO> getTopicProcessList() {
        return topicProcessList;
    }

    public void setTopicProcessList(List<TopicProcessDTO> topicProcessList) {
        this.topicProcessList = topicProcessList;
    }
}
