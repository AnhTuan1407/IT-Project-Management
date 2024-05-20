package com.example.be.service;

import com.example.be.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface INotificationService {
    void save(Notification notification);

    Page<Notification> getListNotification(Integer id, Pageable pageable);

    List<Notification> getListNotificationNotSeen(Integer accountId, Integer notificationId);
}
