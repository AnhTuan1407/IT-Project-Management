package com.example.be.validate;

import com.example.be.dto.InfoTopicRegisterDTO;
import com.example.be.dto.TopicProcessDTO;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TopicProcessValidator {
    public Map<String, String> validate(InfoTopicRegisterDTO infoTopicRegisterDTO) {
        Map<String, String> errors = new HashMap<>();

        List<TopicProcessDTO> topicProcessList = infoTopicRegisterDTO.getTopicProcessList();
        if (topicProcessList != null && topicProcessList.size() > 1) {
            for (int i = 1; i < topicProcessList.size(); i++) {
                TopicProcessDTO currentProcess = topicProcessList.get(i);
                TopicProcessDTO previousProcess = topicProcessList.get(i - 1);

                if (currentProcess.getDateStart() == null || currentProcess.getDateStart().isEmpty()) {
                    errors.put("topicProcessList[" + i + "].dateStart", "Ngày bắt đầu là bắt buộc");
                }

                if (currentProcess.getDateEnd() == null || currentProcess.getDateEnd().isEmpty()) {
                    errors.put("topicProcessList[" + i + "].dateEnd", "Ngày kết thúc là bắt buộc");
                }

                if (previousProcess.getDateEnd() != null && !previousProcess.getDateEnd().isEmpty()
                        && currentProcess.getDateStart() != null && !currentProcess.getDateStart().isEmpty()) {
                    if (currentProcess.getDateStart().compareTo(previousProcess.getDateEnd()) <= 0) {
                        errors.put("topicProcessList[" + i + "].dateStart", "Ngày bắt đầu phải lớn hơn ngày kết thúc của giai đoạn trước đó");
                    }
                }

                if (currentProcess.getDateStart().compareTo(currentProcess.getDateEnd()) >= 0) {
                    errors.put("topicProcessList[" + i + "].dateEnd", "Ngày kết thúc phải lớn hơn ngày bắt đầu");
                }
            }
        }

        return errors;
    }
}
