package com.example.be.service.impl;

import com.example.be.entity.Notification;
import com.example.be.repository.INotificationRepository;
import com.example.be.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements INotificationService {
    @Autowired
    INotificationRepository notificationRepository;


    @Override
    public void save(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public Page<Notification> getListNotification(Integer id, Pageable pageable) {
        return notificationRepository.findNotificationsByAccountId(id, pageable);
    }

    @Override
    public List<Notification> getListNotificationNotSeen(Integer accountId, Integer notificationId) {
        return notificationRepository.findByAccountIdAndStatusIsTrue(accountId, notificationId);
    }
}
