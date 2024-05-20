package com.example.be.service;

import com.example.be.dto.CreateUpdateStudentDTO;
import com.example.be.dto.IStudentEditDTO;
import com.example.be.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStudentService {
    Page<Student> findAllStudent(String find, Pageable pageable);
    Page<Student> findAllStudent(String find,Integer teacherId, Pageable pageable);

    /**
     * KhoaHND
     * Edit Student
     */
    void editStudent(CreateUpdateStudentDTO studentDTO);

    /**
     * KhoaHND
     * Create New Student
     */
    void createNewStudent(CreateUpdateStudentDTO studentDTO);

    /**
     * KhoaHND
     * Find By Id
     */
    IStudentEditDTO findStudentByStudentId(Integer studentId);
    Student getStudentByID(Integer id);
}
