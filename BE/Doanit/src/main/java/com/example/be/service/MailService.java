package com.example.be.service;


import com.example.be.dto.DataMailDTO;

import javax.mail.MessagingException;

public interface MailService {
void sentHTMLMail(DataMailDTO datamail, String templateName) throws MessagingException;
}
