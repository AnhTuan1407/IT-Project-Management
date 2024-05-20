package com.example.be.validate;

import com.example.be.dto.CreateUpdateTeacherDTO;
import com.example.be.dto.ITeacherUpdateDTO;
import com.example.be.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Component
public class TeacherValidatorUpdate {
    @Autowired
    private TeacherRepository teacherRepository;

    private final Pattern PATTERN_NAME = Pattern.compile("^[\\p{L}\\s]+$");
    private final Pattern PATTERN_EMAIL = Pattern.compile("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    private final Pattern PATTERN_PHONE = Pattern.compile("^[0-9]+$");

    public Map<String,String> validate(CreateUpdateTeacherDTO createUpdateTeacherDTO) {
        Map<String,String> errors = new HashMap<>();
        if (createUpdateTeacherDTO.getName() == null || createUpdateTeacherDTO.getName().isEmpty()) {
            errors.put("errorNameEmpty","Tên giáo viên không được trống");
        }
        if (createUpdateTeacherDTO.getName().length() > 50) {
            errors.put("errorNameLength","Tên không được quá 50 ký tự");
        }
        if (!PATTERN_NAME.matcher(createUpdateTeacherDTO.getName()).matches()) {
            errors.put("errorNameSpecialCharacter","Tên không được chứa các kí tự đặc biệt");
        }

        if (createUpdateTeacherDTO.getDateOfBirth() == null || createUpdateTeacherDTO.getDateOfBirth().isEmpty()) {
            errors.put("errorDateEmpty","Ngày tháng năm sinh không được để trống");
        }
        LocalDate now = LocalDate.now();
        int age = Period.between(LocalDate.parse(createUpdateTeacherDTO.getDateOfBirth()), now).getYears();
        if (age < 18) {
            errors.put("errorDateMin","Giáo viên không được nhỏ hơn 18 tuổi");
        }
        if (age > 50) {
            errors.put("errorDateMax","Giáo viên không được lớn hơn 50 tuổi");
        }

        if (createUpdateTeacherDTO.getPhone() == null || createUpdateTeacherDTO.getPhone().isEmpty()) {
            errors.put("errorPhoneEmpty","Số điện thoại không được để trống");
        }
        if (createUpdateTeacherDTO.getPhone().length() != 10) {
            errors.put("errorPhoneLength","Số điện thoại phải có 10 ký tự");
        }
        if (!PATTERN_PHONE.matcher(createUpdateTeacherDTO.getPhone()).matches()) {
            errors.put("errorPhoneNumber","Số điện thoại chỉ được chứa số");
        }

        if (createUpdateTeacherDTO.getEmail() == null || createUpdateTeacherDTO.getEmail().isEmpty()) {
            errors.put("errorEmailEmpty","Email không được để trống");
        }
        if (createUpdateTeacherDTO.getEmail().length() > 50) {
            errors.put("errorEmailLength","Email không được quá 50 ký tự");
        }
        if (!PATTERN_EMAIL.matcher(createUpdateTeacherDTO.getEmail()).matches()) {
            errors.put("errorEmailFormat","Email không hợp lệ");
        }

        ITeacherUpdateDTO teacherUpdateDTO = teacherRepository.getTeacherById(createUpdateTeacherDTO.getTeacherId());
        List<ITeacherUpdateDTO> teachers = teacherRepository.getTeacherByPhoneUpdate(teacherUpdateDTO.getPhone(),createUpdateTeacherDTO.getPhone());
        if (!teachers.isEmpty()) {
            errors.put("errorPhoneDuplicate","Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác");
        }

        teachers = teacherRepository.getTeacherByEmailUpdate(teacherUpdateDTO.getEmail(),createUpdateTeacherDTO.getEmail());
        if (!teachers.isEmpty()) {
            errors.put("errorEmailDuplicate","Email đã tồn tại, vui lòng nhập email khác");
        }


        if (createUpdateTeacherDTO.getAvatar() != null && !createUpdateTeacherDTO.getAvatar().isEmpty()) {
            String[] allowedExtensions = {"jpg", "png", "jpeg"};
            String extension = createUpdateTeacherDTO.getAvatar().substring(createUpdateTeacherDTO.getAvatar().lastIndexOf(".") + 1);
            if (!Arrays.asList(allowedExtensions).contains(extension.toLowerCase())) {
                errors.put("errorFileFormat","File ảnh không đúng định dạng");
            }

            long size = createUpdateTeacherDTO.getAvatar().length();
            if (size > 1024 * 1024 * 10) {
                errors.put("errorFileLength","File ảnh quá lớn");
            }
        }
        return errors;
    }

}
