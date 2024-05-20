package com.example.be.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "info_topic_register")
public class InfoTopicRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_topic_register_id")
    private Integer infoTopicRegisterId;

    // Kiểm tra xem đề tài đã được xét duyệt hay chưa.
    private Boolean status;

    // Kiểm tra xem đã hoàn thành đề tài này hay chưa
    private Boolean statusComplete;

    // Hủy đề tài
    private Boolean topicCancel;

    @Column(columnDefinition = "TEXT")
    private String descriptionURL;

    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "topic_id")
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "group_account_id", referencedColumnName = "group_account_id")
    private GroupAccount groupAccount;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "teacher_id")
    private Teacher teacher;

    @OneToMany(mappedBy = "infoTopicRegister")
    private List<TopicProcess> processList;

    public InfoTopicRegister() {
    }


    public InfoTopicRegister(Integer infoTopicRegisterId, Boolean status, Boolean statusComplete, Boolean topicCancel, String descriptionURL, Topic topic, GroupAccount groupAccount, Teacher teacher, List<TopicProcess> processList) {
        this.infoTopicRegisterId = infoTopicRegisterId;
        this.status = status;
        this.statusComplete = statusComplete;
        this.topicCancel = topicCancel;
        this.descriptionURL = descriptionURL;
        this.topic = topic;
        this.groupAccount = groupAccount;
        this.teacher = teacher;
        this.processList = processList;
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

    public void setTopicCancel(Boolean cancelTopic) {
        this.topicCancel = cancelTopic;
    }

    public String getDescriptionURL() {
        return descriptionURL;
    }

    public void setDescriptionURL(String descriptionURL) {
        this.descriptionURL = descriptionURL;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public GroupAccount getGroupAccount() {
        return groupAccount;
    }

    public void setGroupAccount(GroupAccount groupAccount) {
        this.groupAccount = groupAccount;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public List<TopicProcess> getProcessList() {
        return processList;
    }

    public void setProcessList(List<TopicProcess> processList) {
        this.processList = processList;
    }
}
