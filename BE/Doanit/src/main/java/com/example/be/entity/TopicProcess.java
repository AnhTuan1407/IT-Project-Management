package com.example.be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;


@Entity
@Table(name = "topic_process")
public class TopicProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_process_id")
    private Integer topicProcessId;

    @Column(columnDefinition = "DATE")
    private String dateStart;
    @Column(columnDefinition = "DATE")
    private String dateEnd;

    // Kiểm tra xem đã làm hoàn thành giai đoạn chưa.
    private Boolean status;
    // Giai đoạn 1, Giai đoạn 2...
    private Integer processNumber;
    // Giai đoạn hoàn thành được bao nhiêu %
    private Integer percentProcess;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "info_topic_register_id", referencedColumnName = "info_topic_register_id")
    private InfoTopicRegister infoTopicRegister;

    public TopicProcess() {
    }

    public TopicProcess(Integer topicProcessId, String dateStart, String dateEnd, Boolean status, Integer processNumber, Integer percentProcess, InfoTopicRegister infoTopicRegister) {
        this.topicProcessId = topicProcessId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.status = status;
        this.processNumber = processNumber;
        this.percentProcess = percentProcess;
        this.infoTopicRegister = infoTopicRegister;
    }

    public Integer getTopicProcessId() {
        return topicProcessId;
    }

    public void setTopicProcessId(Integer topicProcessId) {
        this.topicProcessId = topicProcessId;
    }

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Integer getProcessNumber() {
        return processNumber;
    }

    public void setProcessNumber(Integer processNumber) {
        this.processNumber = processNumber;
    }

    public Integer getPercentProcess() {
        return percentProcess;
    }

    public void setPercentProcess(Integer percentProcess) {
        this.percentProcess = percentProcess;
    }

    public InfoTopicRegister getInfoTopicRegister() {
        return infoTopicRegister;
    }

    public void setInfoTopicRegister(InfoTopicRegister infoTopicRegister) {
        this.infoTopicRegister = infoTopicRegister;
    }
}
