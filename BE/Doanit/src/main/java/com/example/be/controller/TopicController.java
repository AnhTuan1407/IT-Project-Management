package com.example.be.controller;

import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.entity.Account;
import com.example.be.entity.InfoTopicRegister;
import com.example.be.entity.Topic;
import com.example.be.security.UserPrinciple;
import com.example.be.service.IAccountService;
import com.example.be.service.IGroupAccountService;
import com.example.be.service.IInfoTopicRegisterService;
import com.example.be.service.ITopicService;
import com.example.be.validate.TopicValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/topic")
public class TopicController {
    @Autowired
    ITopicService iTopicService;
    @Autowired
    IInfoTopicRegisterService iInfoTopicRegisterService;
    @Autowired
    IGroupAccountService iGroupAccountService;
    @Autowired
    TopicValidator topicValidator;
@Autowired
    IAccountService iAccountService;

    @PreAuthorize("hasRole('LEADER')" )
    @RequestMapping(value = "/create_topic", method = RequestMethod.POST, consumes = {"application/json"})
    private ResponseEntity<?> registerTopic(@RequestBody InfoTopicRegisterDTO infoTopicRegisterDTO) {
        Map<String, String> errors = topicValidator.validate(infoTopicRegisterDTO);
        if (errors.isEmpty()) {
            UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Account account= iAccountService.findByUsername(userPrinciple.getUsername());
            Integer groupAccountId= account.getStudent().getGroupAccount().getGroupAccountId();
            InfoTopicRegister infoTopicRegister = new InfoTopicRegister();
            infoTopicRegister.setTopic(infoTopicRegisterDTO.getTopic());
            infoTopicRegister.setGroupAccount(iGroupAccountService.findById(groupAccountId));
            if (infoTopicRegister.getTopic().getTopicId() == null) {
                Topic topic = infoTopicRegister.getTopic();
                topic.setDeleteFlag(0);
                infoTopicRegister.setTopic(iTopicService.saveTopic(topic));
            }
            infoTopicRegister.setStatus(false);
            infoTopicRegister.setStatusComplete(false);
            infoTopicRegister.setTopicCancel(false);
            infoTopicRegister.setDescriptionURL(null);
            infoTopicRegister.setTeacher(null);
            infoTopicRegister.setProcessList(null);

            iInfoTopicRegisterService.registerInfoTopic(infoTopicRegister);

            return new ResponseEntity<>(infoTopicRegisterDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<Map<String,String>>(errors, HttpStatus.BAD_REQUEST);
        }

    }
}
