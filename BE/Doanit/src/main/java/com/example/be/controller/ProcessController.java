package com.example.be.controller;

import com.example.be.dto.IInfoTopicDTO;
import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.entity.Account;
import com.example.be.entity.InfoTopicRegister;
import com.example.be.security.UserPrinciple;
import com.example.be.service.IAccountService;
import com.example.be.service.IInfoTopicRegisterService;
import com.example.be.service.ITopicManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin("*")
public class ProcessController {
    @Autowired
    private IInfoTopicRegisterService iInfoTopicRegisterService;

    @Autowired
    private ITopicManagerService iTopicManagerService;
    @Autowired
    private IAccountService iAccountService;

    @PreAuthorize("hasRole('TEACHER')" )
    @GetMapping("/get-topic-not-approval")
    private ResponseEntity<?> getListTopicNotApproval(@RequestParam("page") int page,
                                                      @RequestParam("size") int size) {

        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        Integer accountId = account.getAccountId();
        Integer teacherId = account.getTeacher().getTeacherId();

        Page<InfoTopicRegister> infoTopicRegisterList =
                iInfoTopicRegisterService.getListTopicNotApproval(teacherId, PageRequest.of(page - 1, size));

        if (infoTopicRegisterList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(infoTopicRegisterList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')" )
    @PostMapping("/approval")
    private ResponseEntity<?> approvalTopic(@RequestBody InfoTopicRegisterDTO infoTopicRegisterDTO) throws MessagingException, UnsupportedEncodingException {
//        iInfoTopicRegisterService.sendStudentApproval(infoTopicRegisterDTO);
//        iInfoTopicRegisterService.setStatusApproval(infoTopicRegisterDTO.getInfoTopicRegisterId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')" )
    @GetMapping("/findByIdInfoTopic/{id}")
    public ResponseEntity<?> getByIdTopic(@PathVariable Integer id) {
        IInfoTopicDTO item = iInfoTopicRegisterService.getInfoTopicById(id);
        if (item == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
}