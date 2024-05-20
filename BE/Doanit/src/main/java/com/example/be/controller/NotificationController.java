package com.example.be.controller;

import com.example.be.entity.Account;
import com.example.be.entity.Notification;
import com.example.be.security.UserPrinciple;
import com.example.be.service.IAccountService;
import com.example.be.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private IAccountService iAccountService;

    @Autowired
    private INotificationService notificationService;

    @PreAuthorize("hasRole('STUDENT')" )
    @GetMapping("/notification")
    private ResponseEntity<?> getListNotification(
            @PageableDefault(size = 5) Pageable pageable) {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        Page<Notification> notificationList = notificationService.getListNotification(account.getAccountId(), pageable);

        return new ResponseEntity<>(notificationList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('STUDENT')" )
    @GetMapping("/seen-notification/{notificationId}")
    private ResponseEntity<?> seenNotification(
            @PathVariable Integer notificationId,
            @PageableDefault(size = 5) Pageable pageable) {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        List<Notification> notificationList = notificationService.getListNotificationNotSeen(account.getAccountId(),notificationId);

        for (Notification notification : notificationList) {
            notification.setStatus(true);
            notificationService.save(notification);
        }

        Page<Notification> notificationPage = notificationService.getListNotification(account.getAccountId(), pageable);

        return new ResponseEntity<>(notificationPage, HttpStatus.OK);
    }
}
