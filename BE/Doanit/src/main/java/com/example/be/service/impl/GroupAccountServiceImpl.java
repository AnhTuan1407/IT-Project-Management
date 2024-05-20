package com.example.be.service.impl;

import com.example.be.entity.GroupAccount;
import com.example.be.entity.Student;
import com.example.be.repository.GroupAccountRepository;
import com.example.be.service.ClientService;
import com.example.be.service.IGroupAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GroupAccountServiceImpl implements IGroupAccountService {
    @Autowired
    GroupAccountRepository groupAccountRepository;
    @Autowired
    ClientService clientService;
    @Autowired
    JavaMailSender javaMailSender;
    @Override
    public void saveGroup(String name, Integer studentId, Integer accountId, ArrayList<Student> students) {
        groupAccountRepository.setGroupLeader(accountId);
        GroupAccount grObj = new GroupAccount(name, true);
       GroupAccount groupAccount = groupAccountRepository.save(grObj);
      Boolean b=  clientService.create(groupAccount.getGroupAccountId(),students);
        System.out.println(b);
        groupAccountRepository.agreeJoinGroup(groupAccount.getGroupAccountId(),studentId);

    }

    @Override
    public void acceptJoinGroup(Integer groupId, Integer studentId) {
    groupAccountRepository.agreeJoinGroup(groupId,studentId);
    }

    @Override
    public GroupAccount findById(Integer groupId) {
        return groupAccountRepository.findById(groupId).orElse(null);
    }

    public void deleteGroup(Integer groupId, List<Integer> integerList) {

        groupAccountRepository.deleteGroup(groupId);
        for (Integer id:integerList){
            groupAccountRepository.deleteGroupOfStudentById(id);
        }
    }
    @Override
    public void acceptGroup(Integer groupId) {
        groupAccountRepository.acceptGroup(groupId);
    }



    @Override
    public Page<GroupAccount> listGroup(String find, Pageable pageable) {
        return groupAccountRepository.findAllGroup(find, pageable);
    }
    @Override
    public void updateDeadLine(String date, Integer groupId) {
        groupAccountRepository.updateDeadLine(date, groupId);
    }

    @Override
    public void sendStudentDelete(GroupAccount groupAccount) throws MessagingException, UnsupportedEncodingException {

        String subject = "Thông báo xóa nhóm!";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        String mailContent;
        String[] emailList = new String[groupAccount.getStudentList().size()];

        for (int i = 0; i<groupAccount.getStudentList().size(); i++) {
            emailList[i] = groupAccount.getStudentList().get(i).getEmail();
        }
        helper.setTo(emailList);
        helper.setFrom("nghia20480", "Teacher - Người kiểm duyệt nhóm");
        helper.setSubject(subject);
        mailContent = "<div style='text-align: center'>\n" +
                "    <h2>Nội dung nguyên nhân xóa nhóm</h2>\n" +
                "    <p><span style='font-weight: bold'></span></p>\n" +
                "    <p><span style='font-weight: bold'> Yêu cầu bạn hãy nhanh chóng chọn nhóm mới </span></p>\n" +
                "    </div>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);

    }
    @Override
    public void sendStudentAccept(GroupAccount groupAccount) throws MessagingException, UnsupportedEncodingException {

        String subject = "Thông báo chấp nhận nhóm!";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        String mailContent;
        String[] emailList = new String[groupAccount.getStudentList().size()];

        for (int i = 0; i<groupAccount.getStudentList().size(); i++) {
            emailList[i] = groupAccount.getStudentList().get(i).getEmail();
        }
        helper.setTo(emailList);
        helper.setFrom("nghia20480", "Teacher - Người kiểm duyệt nhóm");
        helper.setSubject(subject);
        mailContent = "<div style='text-align: center'>\n" +
                "    <h2>Nhóm của bạn đã được chấp nhâ bởi giáo viên</h2>\n" +
                "    <p><span style='font-weight: bold'></span></p>\n" +
                "    <p><span style='font-weight: bold'> Xin chúc mừng!! </span></p>\n" +
                "    </div>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);

    }
}

