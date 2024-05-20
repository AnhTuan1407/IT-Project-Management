package com.example.be.entity;

import javax.persistence.*;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(columnDefinition = "DATETIME")
    private String timeComment;
    private String title;
    private String content;
    // Kiểm tra xem là đánh giá của giáo viên hay là thắc mắc của sinh viên.
    // Đánh giá của giáo viên = true;
    // Thắc mắc của sinh viên = false;
    private Boolean status;
    private Boolean deleteFlag;

    @ManyToOne
    @JoinColumn(name = "topic_process_id", referencedColumnName = "topic_process_id")
    private TopicProcess topicProcess;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "reply_comment_id", referencedColumnName = "comment_id")
    private Comment replyComment;

    public Comment() {
    }

    public Comment(Integer commentId, String timeComment, String title, String content, Boolean status, Boolean deleteFlag, TopicProcess topicProcess, Account account, Comment replyComment) {
        this.commentId = commentId;
        this.timeComment = timeComment;
        this.title = title;
        this.content = content;
        this.status = status;
        this.deleteFlag = deleteFlag;
        this.topicProcess = topicProcess;
        this.account = account;
        this.replyComment = replyComment;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public String getTimeComment() {
        return timeComment;
    }

    public void setTimeComment(String timeComment) {
        this.timeComment = timeComment;
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Boolean deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public TopicProcess getTopicProcess() {
        return topicProcess;
    }

    public void setTopicProcess(TopicProcess topicProcess) {
        this.topicProcess = topicProcess;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Comment getReplyComment() {
        return replyComment;
    }

    public void setReplyComment(Comment replyComment) {
        this.replyComment = replyComment;
    }
}
