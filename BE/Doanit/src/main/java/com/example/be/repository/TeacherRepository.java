package com.example.be.repository;

import com.example.be.dto.ITeacherDto;
import com.example.be.dto.ITeacherUpdateDTO;
import com.example.be.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    @Modifying
    @Query(value = "insert  into teacher(teacher.address, teacher.avatar, teacher.date_of_birth, teacher.email, teacher.name, teacher.phone," +
            "teacher.degree_id, teacher.faculty_id, teacher.gender,teacher.account_id, teacher.delete_flag) value (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10, true )",nativeQuery = true)
    void createTeacher(String address, String avatar, String dateOfBirth, String email, String name, String phone, Integer degreeId, Integer facultyId,Boolean gender, Integer accountId);

    @Query(value = "select teacher.teacher_id as teacherId, teacher.address as address, teacher.avatar as avatar, teacher.date_of_birth as dateOfBirth," +
            "teacher.email as email, teacher.name as name, teacher.phone as phone, teacher.degree_id as degreeId, teacher.faculty_id as facultyId," +
            "teacher.gender as gender from teacher where teacher.teacher_id = ?1 and teacher.delete_flag = true", nativeQuery = true)
    ITeacherUpdateDTO getTeacherById(Integer id);

    @Modifying
    @Query(value = "update teacher set teacher.address = ?1, teacher.avatar = ?2, teacher.date_of_birth = ?3, teacher.email = ?4, teacher.name = ?5, teacher.phone = ?6, teacher.degree_id = ?7," +
            "teacher.faculty_id = ?8, teacher.gender = ?9 where teacher.teacher_id = ?10", nativeQuery = true)
    void updateTeacher(String address, String avatar, String dateOfBirth, String email, String name, String phone, Integer degree, Integer faculty, Boolean gender, Integer id);

    @Query(value = "select teacher.teacher_id as teacherId, teacher.address as address, teacher.avatar as avatar, teacher.date_of_birth as dateOfBirth," +
            "teacher.email as email, teacher.name as name, teacher.phone as phone, teacher.degree_id as degree_id, teacher.faculty_id as faculty_id," +
            "teacher.gender as gender from teacher where teacher.email = ?1 and teacher.delete_flag = true", nativeQuery = true)
    List<ITeacherUpdateDTO> getTeacherByEmail(String email);

    @Query(value = "select teacher.teacher_id as teacherId, teacher.address as address, teacher.avatar as avatar, teacher.date_of_birth as dateOfBirth," +
            "teacher.email as email, teacher.name as name, teacher.phone as phone, teacher.degree_id as degree_id, teacher.faculty_id as faculty_id," +
            "teacher.gender as gender from teacher where teacher.phone = ?1 and teacher.delete_flag = true", nativeQuery = true)
    List<ITeacherUpdateDTO> getTeacherByPhone(String phone);



    @Query(value = "select teacher.teacher_id as teacherId, teacher.address as address, teacher.avatar as avatar, teacher.date_of_birth as dateOfBirth," +
            "teacher.email as email, teacher.name as name, teacher.phone as phone, teacher.degree_id as degree_id, teacher.faculty_id as faculty_id," +
            "teacher.gender as gender from teacher where (teacher.phone = ?2 and teacher.phone != ?1) and teacher.delete_flag = true", nativeQuery = true)
    List<ITeacherUpdateDTO> getTeacherByPhoneUpdate(String oldPhone, String newPhone);

    @Query(value = "select teacher.teacher_id as teacherId, teacher.address as address, teacher.avatar as avatar, teacher.date_of_birth as dateOfBirth," +
            "teacher.email as email, teacher.name as name, teacher.phone as phone, teacher.degree_id as degree_id, teacher.faculty_id as faculty_id," +
            "teacher.gender as gender from teacher where (teacher.email = ?2 and teacher.email != ?1) and teacher.delete_flag = true", nativeQuery = true)
    List<ITeacherUpdateDTO> getTeacherByEmailUpdate(String oldEmail, String newEmail);


    @Query(value = "SELECT  t.teacher_id As teacherId, t.name AS teacherName, t.email, t.phone, t.avatar, f.name AS facultyName \n" +
            "FROM teacher t\n" +
            "JOIN faculty f ON t.faculty_id = f.faculty_id\n" +
            "where concat('MGV-',t.teacher_id,\n" +
            "  ifnull(t.phone,''),\n" +
            "  ifnull(t.email,''),\n" +
            "  ifnull(t.name,''),\n" +
            "  f.name\n) " +
            "like concat('%', :find, '%')\n" +
            "and t.delete_flag = 1" ,nativeQuery = true)
    Page<ITeacherDto> getAllTeacher(String find, Pageable pageable);

    @Modifying
    @Query(value = "update teacher set teacher.delete_flag = 0 where teacher.teacher_id = ?1",nativeQuery = true)
    void deleteTeacher(Integer id);

}
