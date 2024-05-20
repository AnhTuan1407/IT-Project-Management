package com.example.be.service.impl;


import com.example.be.dto.DataMailDTO;
import com.example.be.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Slf4j
public class mailServiceImpl implements MailService {
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    SpringTemplateEngine springTemplateEngine;
    @Override
    public void sentHTMLMail(DataMailDTO datamail, String templateName) throws MessagingException {
        MimeMessage message= mailSender.createMimeMessage();
        MimeMessageHelper helper= new MimeMessageHelper(message,true,"utf-8");
        Context context= new Context();
        context.setVariables(datamail.getProps());
        String html= springTemplateEngine.process(templateName,context);
        helper.setTo(datamail.getTo());
        helper.setSubject(datamail.getSubject());
        helper.setText(html,true);
        mailSender.send((message));
    }
}
