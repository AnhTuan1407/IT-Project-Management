package com.example.be.repository;

import com.example.be.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface INotificationRepository extends JpaRepository<Notification, Integer> {

    @Query(value = "SELECT notification_id, content, status, time_notification, title, url, account_id, account_send_notification_id FROM doanit.notification WHERE notification.account_id = ?1 ORDER BY notification.time_notification DESC", nativeQuery = true)
    Page<Notification> findNotificationsByAccountId(Integer accountId, Pageable pageable);


    @Query(value = "SELECT notification_id, content, status, time_notification, title, url, account_id, account_send_notification_id FROM doanit.notification WHERE notification.account_id = ?1  AND notification.notification_id = ?2 AND notification.status = 0  ORDER BY notification.time_notification DESC", nativeQuery = true)
    List<Notification> findByAccountIdAndStatusIsTrue(Integer accountId, Integer notificationId);

}
