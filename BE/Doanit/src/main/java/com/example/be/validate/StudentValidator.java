package com.example.be.validate;

import com.example.be.dto.CreateUpdateStudentDTO;
import com.example.be.dto.IStudentEditDTO;
import com.example.be.repository.StudentRepository;
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
public class StudentValidator {

    @Autowired
    StudentRepository studentRepository;
    private final Pattern pattern_name = Pattern.compile("^[\\p{L}\\s]+$");
    private final Pattern pattern_email = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    private final Pattern pattern_phone = Pattern.compile("^[0-9]+$");

    public Map<String, String> validate(CreateUpdateStudentDTO createUpdateStudentDTO) {
        Map<String, String> errors = new HashMap<>();

        //validate Name
        if (createUpdateStudentDTO.getName() == null || createUpdateStudentDTO.getName().isEmpty()) {
            errors.put("errorNameEmpty", "Tên sinh viên không được trống");
        }
        if ((createUpdateStudentDTO.getName().length() > 0 && createUpdateStudentDTO.getName().length() < 5) || createUpdateStudentDTO.getName().length() > 50) {
            errors.put("errorNameLength", "Tên sinh viên không được bé hơn 5 hay lớn hơn 50");
        }
        if (!pattern_name.matcher(createUpdateStudentDTO.getName()).matches()) {
            errors.put("errorNameSpecialCharacter", "Tên sinh viên không được chứa các ký tự đặc biệt");
        }

        //validate date of birth
        if (createUpdateStudentDTO.getDateOfBirth() == null || createUpdateStudentDTO.getDateOfBirth().isEmpty()) {
            errors.put("errorNameEmpty", "Ngày tháng năm sinh không được trống");
        }
        LocalDate now = LocalDate.now();
        int age = Period.between(LocalDate.parse(createUpdateStudentDTO.getDateOfBirth()), now).getYears();
        if (age < 18) {
            errors.put("errorDateMin", "Sinh viên không được bé hơn 18");
        }
        if (age > 50) {
            errors.put("errorDateMax", "Sinh viên không được lớn hơn 50");
        }

        //validate phone
        if (createUpdateStudentDTO.getPhone() == null || createUpdateStudentDTO.getPhone().isEmpty()) {
            errors.put("errorPhoneEmpty", "Số điện thoại không được để trống");
        }
        if (createUpdateStudentDTO.getPhone().length() != 10) {
            errors.put("errorPhoneLength", "Số điện thoại phải có 10 ký tự");
        }
        if (!pattern_phone.matcher(createUpdateStudentDTO.getPhone()).matches()) {
            errors.put("errorPhoneSpecialCharacter", "Số điện thoại chỉ được chứa số");
        }

        //validate email
        if (createUpdateStudentDTO.getEmail() == null || createUpdateStudentDTO.getEmail().isEmpty()) {
            errors.put("errorEmailEmpty", "Email không được để trống");
        }
        if (createUpdateStudentDTO.getEmail().length() > 50) {
            errors.put("errorEmailLength", "Email không được  lớn hơn 50 ");
        }
        if (!pattern_email.matcher(createUpdateStudentDTO.getEmail()).matches()) {
            errors.put("errorSpecialCharacter", "Email không hợp lệ");
        }

        //validate address
        if (createUpdateStudentDTO.getAddress() == null || createUpdateStudentDTO.getAddress().isEmpty()) {
            errors.put("errorAddressEmpty", "Địa chỉ không được để trống");
        }
        if ((createUpdateStudentDTO.getAddress().length() > 0 && createUpdateStudentDTO.getAddress().length() < 5) || createUpdateStudentDTO.getAddress().length() > 50) {
            errors.put("errorAddressLength", "Địa chỉ không được bé hơn 5 hay lớn hơn 50");
        }


//        //validate image
//        if (createUpdateStudentDTO.getAvatar() != null && !createUpdateStudentDTO.getAvatar().isEmpty()) {
//            String[] allowedExtensions = {"jpg", "png", "jpeg"};
//            String extension = createUpdateStudentDTO.getAvatar().substring(createUpdateStudentDTO.getAvatar().lastIndexOf(".") + 1);
//            if (!Arrays.asList(allowedExtensions).contains(extension)) {
//                errors.put("errorFileFormat", "File ảnh không đúng định dạng");
//            }
//
//            long size = createUpdateStudentDTO.getAvatar().length();
//            if (size > 1024 * 1024 * 10) {
//                errors.put("errorFileLength", "File ảnh quá lớn");
//            }
//        }

        if (createUpdateStudentDTO.getAvatar() == null || createUpdateStudentDTO.getAvatar().isEmpty()) {
            errors.put("errorFileEmpty", "File ảnh không được để trống");
        } else {
            String[] allowedExtensions = {"jpg", "png", "jpeg"};
            String extension = createUpdateStudentDTO.getAvatar().substring(createUpdateStudentDTO.getAvatar().lastIndexOf(".") + 1);

            if (!Arrays.asList(allowedExtensions).contains(extension)) {
                errors.put("errorFileFormat", "File ảnh không đúng định dạng");
            }

            long size = createUpdateStudentDTO.getAvatar().length();
            if (size > 1024 * 1024 * 10) {
                errors.put("errorFileLength", "File ảnh quá lớn");
            }
        }




        //validate duplicate
        List<IStudentEditDTO> students = studentRepository.findStudentByPhone(createUpdateStudentDTO.getPhone());
        if (!students.isEmpty()) {
            errors.put("errorPhoneDuplicate", "Số điện thoại đã tồn tại");
        }

        students = studentRepository.findStudentByEmail(createUpdateStudentDTO.getEmail());
        if (!students.isEmpty()) {
            errors.put("errorEmailDuplicate", "Email đã tồn tại");
        }


        return errors;
    }

}
