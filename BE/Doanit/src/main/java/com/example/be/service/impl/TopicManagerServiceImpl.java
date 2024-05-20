package com.example.be.service.impl;

import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.dto.TopicProcessDTO;
import com.example.be.entity.Topic;
import com.example.be.repository.IInfoTopicRegisterRepository;
import com.example.be.repository.ITopicManagerRepository;
import com.example.be.service.ITopicManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class TopicManagerServiceImpl implements ITopicManagerService {
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    private ITopicManagerRepository topicManagerRepository;

    @Autowired
    private IInfoTopicRegisterRepository iInfoTopicRegisterRepository;

    @Override
    public Page<Topic> findAllTopic(Pageable pageable) {
        return topicManagerRepository.findAllTopic(pageable);
    }

    @Override
    public Page<Topic> findAllTopicByName(String name, Pageable pageable) {
        return topicManagerRepository.findAllTopicByName(false, name, pageable);
    }

    @Override
    public Topic findByIdTopic(Integer id) {
        return topicManagerRepository.findByIdTopic(id);
    }

    @Override
    public void topicCancel(Integer id) {
        iInfoTopicRegisterRepository.approvalCancel(true, id);
        iInfoTopicRegisterRepository.topicCancel(true, id);
    }

    @Override
    public void deleteTopic(Integer id) {
        topicManagerRepository.deleteTopic(true, id);
    }

    @Override
    public void createTopicProcess(TopicProcessDTO topicProcessDTO) {
        topicManagerRepository.createTopicProcess(topicProcessDTO.getDateStart(), topicProcessDTO.getDateEnd(), 0, topicProcessDTO.getProcessNumber(), false, topicProcessDTO.getInfoTopicRegister());
    }

    @Override
    public void sendStudent(InfoTopicRegisterDTO infoTopicRegisterDTO) throws MessagingException, UnsupportedEncodingException {
        String subject = "Thông báo hủy đề tài!";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        String mailContent;
        String[] emailList = new String[infoTopicRegisterDTO.getStudentList().size()];

        for (int i = 0; i<infoTopicRegisterDTO.getStudentList().size(); i++) {
            emailList[i] = infoTopicRegisterDTO.getStudentList().get(i).getEmail();
        }
        helper.setTo(emailList);
        helper.setFrom("anhtuan2003147", "Teacher - Người kiểm duyệt đề tài");
        helper.setSubject(subject);
        mailContent = "<div style='text-align: center'>\n" +
                "    <h2>Nội dung nguyên nhân hủy đề tài</h2>\n" +
                "    <p><span style='font-weight: bold'>" + infoTopicRegisterDTO.getMessageCancel() + "</span></p>\n" +
                "    <p><span style='font-weight: bold'> Yêu cầu bạn hãy nhanh chóng chọn đề tài mới </span></p>\n" +
                "    </div>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }

    @Override
    public void sendStudentApproval(InfoTopicRegisterDTO infoTopicRegisterDTO) throws MessagingException, UnsupportedEncodingException {
        String subject = "Thông báo kiểm duyệt đề tài!";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        String mailContent;
        String[] emailList = new String[infoTopicRegisterDTO.getStudentList().size()];

        for (int i = 0; i<infoTopicRegisterDTO.getStudentList().size(); i++) {
            emailList[i] = infoTopicRegisterDTO.getStudentList().get(i).getEmail();
        }
        helper.setTo(emailList);
        helper.setFrom("anhtuan2003147", "Teacher - Người kiểm duyệt đề tài");
        helper.setSubject(subject);
        mailContent = "<div style='text-align: center'>\n" +
                "    <h2>Chúc mừng đề tài của bạn đã được duyệt!</h2>\n" +
                "    <p><span style='font-weight: bold'> Yêu cầu bạn hãy nhanh chóng làm việc theo các giai đoạn giáo viên đã giao! </span></p>\n" +
                "    </div>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }
}
