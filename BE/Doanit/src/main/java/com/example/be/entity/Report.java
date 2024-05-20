package com.example.be.entity;

import javax.persistence.*;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @Column(columnDefinition = "text")
    private String url;


    @Column(columnDefinition = "dateTime")
    private String date;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "topic_process_id", referencedColumnName = "topic_process_id")
    private TopicProcess topicProcess;

    public Report() {
    }

    public Report(Integer reportId, String url, String date, String title, String content, TopicProcess topicProcess) {
        this.reportId = reportId;
        this.url = url;
        this.date = date;
        this.title = title;
        this.content = content;
        this.topicProcess = topicProcess;
    }

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public TopicProcess getTopicProcess() {
        return topicProcess;
    }

    public void setTopicProcess(TopicProcess topicProcess) {
        this.topicProcess = topicProcess;
    }
}
