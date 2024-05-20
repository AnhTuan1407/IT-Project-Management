package com.example.be.validate;

import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.entity.Topic;
import com.example.be.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class TopicValidator {
    @Autowired
    private TopicRepository topicRepository;

    public Map<String, String> validate(InfoTopicRegisterDTO infoTopicRegisterDTO) {
        ArrayList<Topic> topics= topicRepository.findTopicByName(infoTopicRegisterDTO.getTopic().getName());
        Map<String, String> errors = new HashMap<>();
        if (infoTopicRegisterDTO.getTopic().getName() == null) {
            errors.put("errorNameNull", "Tên không được để trống");
            return errors;
        }
        if (!topics.isEmpty()) {
            errors.put("errorNameDuplicate", "Tên đề tài không được Trùng");
            return errors;
        }
        if (infoTopicRegisterDTO.getTopic().getName().length() > 225) {
            errors.put("errorNameLength", "Tên không vượt quá 225 ký tự ");
        }
        if (infoTopicRegisterDTO.getTopic().getName().length() > 225) {
            errors.put("errorNameLength", "Tên không vượt quá 225 ký tự ");
        }
        if (infoTopicRegisterDTO.getTopic().getIntroduce() == null) {
            errors.put("errorContentNull ", "Nội dung không được để trống ");
        }
        if (infoTopicRegisterDTO.getTopic().getImage() != null && !infoTopicRegisterDTO.getTopic().getImage().isEmpty()) {
            String[] allowedExtensions = {"jpg", "png", "jpeg"};
            String extension = infoTopicRegisterDTO.getTopic().getImage().substring(infoTopicRegisterDTO.getTopic().getImage().lastIndexOf(".") + 1);
            if (!Arrays.asList(allowedExtensions).contains(extension)) {
                errors.put("errorFileImgFormat", "File ảnh không đúng định dạng");
            }

            long size = infoTopicRegisterDTO.getTopic().getImage().length();
            if (size > 1024 * 1024 * 10) {
                errors.put("errorFileImgLength", "File ảnh quá lớn");
            }
        }
        if (infoTopicRegisterDTO.getTopic().getContent() != null && !infoTopicRegisterDTO.getTopic().getContent().isEmpty()) {
            String[] allowedExtensions = {"docx"};
            String extension = infoTopicRegisterDTO.getTopic().getContent().substring(infoTopicRegisterDTO.getTopic().getContent().lastIndexOf(".") + 1);
            if (!Arrays.asList(allowedExtensions).contains(extension.toLowerCase())) {
                errors.put("errorFileFormat", "File mô tả không đúng định dạng");
            }

            long size = infoTopicRegisterDTO.getTopic().getContent().length();
            if (size > 1024 * 1024 * 10) {
                errors.put("errorFileLength", "File mô tả quá lớn");
            }
        }
        return errors;
    }
}
