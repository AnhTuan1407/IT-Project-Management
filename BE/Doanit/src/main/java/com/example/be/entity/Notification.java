package com.example.be.entity;

import javax.persistence.*;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id") // Đặt tên cột tại đây
    private Integer notificationId;

    @Column(columnDefinition = "DATETIME")
    private String timeNotification;
    private String content;
    private String title;
    // Kiểm tra xem người dùng đã xem thông báo hay chưa.
    private Boolean status;
    private String url;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "account_send_notification_id", referencedColumnName = "account_id")
    private Account accountSendNotification;

    public Notification() {
    }

    public Notification(Integer notificationId, String timeNotification, String content, String title, Boolean status, String url, Account account, Account accountSendNotification) {
        this.notificationId = notificationId;
        this.timeNotification = timeNotification;
        this.content = content;
        this.title = title;
        this.status = status;
        this.url = url;
        this.account = account;
        this.accountSendNotification = accountSendNotification;
    }

    public Integer getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }

    public String getTimeNotification() {
        return timeNotification;
    }

    public void setTimeNotification(String timeNotification) {
        this.timeNotification = timeNotification;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccountSendNotification() {
        return accountSendNotification;
    }

    public void setAccountSendNotification(Account accountSendNotification) {
        this.accountSendNotification = accountSendNotification;
    }
}
