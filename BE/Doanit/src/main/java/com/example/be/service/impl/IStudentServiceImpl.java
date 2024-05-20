package com.example.be.service.impl;

import com.example.be.dto.CreateUpdateStudentDTO;
import com.example.be.dto.IStudentEditDTO;
import com.example.be.entity.Student;
import com.example.be.repository.StudentRepository;
import com.example.be.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class IStudentServiceImpl implements IStudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Override
    public Page<Student> findAllStudent(String find, Pageable pageable) {
        return studentRepository.getAllStudent(find,pageable);
    }

    @Override
    public Page<Student> findAllStudent(String find, Integer teacherId, Pageable pageable) {
        return studentRepository.getAllStudent(find,teacherId, pageable);
    }


    /**
     * KhoaHND
     * Edit Student
     */
    @Override
    public void editStudent(CreateUpdateStudentDTO studentDTO) {
        studentRepository.editStudent(studentDTO.getName(), studentDTO.getEmail(), studentDTO.getAvatar(), studentDTO.getAddress(), studentDTO.getDateOfBirth(),
                studentDTO.getPhone(), studentDTO.getGrade(), studentDTO.getGender(), studentDTO.getStudentId());
    }

    /**
     * KhoaHND
     * Create New Student
     */
    @Override
    public void createNewStudent(CreateUpdateStudentDTO studentDTO) {
        studentRepository.addNewStudent(studentDTO.getName(), studentDTO.getEmail(), studentDTO.getAvatar(), studentDTO.getAddress(),
                studentDTO.getDateOfBirth(), studentDTO.getPhone(), studentDTO.getGrade(),studentDTO.getAccountId(), studentDTO.getGender());
    }

    @Override
    public IStudentEditDTO findStudentByStudentId(Integer studentId) {
        return studentRepository.findStudentByStudentId(studentId);
    }
    public Student getStudentByID(Integer id) {
        return studentRepository.getStudentsById(id);
    }
}
