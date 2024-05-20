package com.example.be.repository;

import com.example.be.dto.IStudentEditDTO;
import com.example.be.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Integer> {

    /**
     * Get All Student For Admin
     */
    @Query(value = "SELECT * FROM student " +
            "JOIN grade ON student.grade_id = grade.grade_id " +
            "JOIN faculty ON grade.faculty_id = faculty.faculty_id " +
            "WHERE CONCAT('MSV', student.student_id, ' ', IFNULL(student.name, '')) " +
            "LIKE CONCAT('%', ?1, '%') AND student.delete_flag = 1 " +
            "ORDER BY student.student_id",
            nativeQuery = true)
    Page<Student> getAllStudent(String find,  Pageable pageable);
//    /**
//     * Get All Student For Teacher
//     */
//    @Query(value = "SELECT *  FROM student " +
//            "JOIN grade ON student.grade_id = grade.grade_id " +
//            "JOIN faculty ON grade.faculty_id = faculty.faculty_id " +
//            "WHERE CONCAT('MSV" +
//            "', student.student_id, IFNULL(student.name, '')) " +
//            "LIKE CONCAT('%', ?1, '%') AND student.delete_flag = 1 " +
//            "AND student.student_id IN (SELECT student.student_id FROM student " +
//            "JOIN group_account ON student.group_account_id = group_account.group_account_id " +
//            "JOIN info_topic_register ON group_account.group_account_id = info_topic_register.group_account_id " +
//            "JOIN teacher ON teacher.teacher_id= info_topic_register.teacher_id " +
//            "WHERE teacher.teacher_id = ?2) " +
//            "ORDER BY student.student_id"
//            , nativeQuery = true)
//    Page<Student> getAllStudent(String find, Integer teacherId ,Pageable pageable);
    /**
     * Get All Student For Teacher
     */
    @Query(value = "SELECT * FROM student " +
            "JOIN grade ON student.grade_id = grade.grade_id " +
            "JOIN group_account ON student.group_account_id = group_account.group_account_id " +
            "JOIN faculty ON grade.faculty_id = faculty.faculty_id " +
            "WHERE CONCAT('MSV', student.student_id, IFNULL(group_account.name, ''), IFNULL(student.name, '')) LIKE CONCAT('%', ?1, '%') " +
            "AND student.delete_flag = 1 " +
            "AND student.student_id IN (" +
            "    SELECT student.student_id FROM student " +
            "    JOIN group_account ON student.group_account_id = group_account.group_account_id " +
            "     JOIN info_topic_register ON group_account.group_account_id = info_topic_register.group_account_id " +
            "    JOIN teacher ON teacher.teacher_id= info_topic_register.teacher_id " +
            "    WHERE teacher.teacher_id = ?2" +
            ") " +
            "ORDER BY student.student_id"
            , nativeQuery = true)
    Page<Student> getAllStudent(String find, Integer teacherId ,Pageable pageable);


    /**
     * KhoaHND
     * Edit Student
     */
    @Modifying
    @Query(value = "update student set student.name = ?1, student.email = ?2, student.avatar = ?3, student.address = ?4, " +
            "student.date_of_birth = ?5, student.phone =?6, student.grade_id = ?7,student.gender = ?8 where student.student_id=?9 ",nativeQuery = true)
    void editStudent(String name, String email, String avatar, String address, String dayOfBirth, String phone, Integer grade, Boolean gender, Integer studentId);

    /**
     * KhoaHND
     * Add New Student
     */
    @Modifying
    @Query(value = "insert into student(student.name, student.email, student.avatar, student.address, " +
            " student.date_of_birth, student.phone, student.grade_id, student.account_id, student.gender, student.delete_flag)" +
            "values(?1,?2,?3,?4,?5,?6,?7,?8,?9, true) ",nativeQuery = true)
    void addNewStudent(String name, String email, String avatar, String address, String dayOfBirth, String phone, Integer grade, Integer accountId, Boolean gender);

    /**
     * KhoaHND
     * find By Id
     */
    @Query(value = "select student.student_id as studentId, student.name as name, student.date_of_birth as dateOfBirth, student.phone as phone," +
            "student.grade_id as grade, student.address as address, student.email as email, student.avatar as avatar, student.gender as gender from student where student.student_id = ?1 and student.delete_flag = 1", nativeQuery = true)
    IStudentEditDTO findStudentByStudentId(Integer studentId);

@Query(value = "select * from student where student_id=?1",nativeQuery = true)
Student getStudentsById(Integer integer);
    /**
     * KhoaHND
     * find By phone
     */
    @Query(value = "select student.student_id as studentId, student.name as name, student.date_of_birth as dateOfBirth, student.phone as phone," +
            "student.grade_id as grade, student.address as address, student.email as email, student.avatar as avatar, student.gender as gender from student where student.phone = ?1 and student.delete_flag = 1", nativeQuery = true)
    List<IStudentEditDTO> findStudentByPhone(String phone);

    @Query(value = "select student.student_id as studentId, student.name as name, student.date_of_birth as dateOfBirth, student.phone as phone," +
            "student.grade_id as grade, student.address as address, student.email as email, student.avatar as avatar, student.gender as gender from student where (student.phone = ?2 and student.phone != ?1) and student.delete_flag = 1", nativeQuery = true)
    List<IStudentEditDTO> findStudentByPhoneUpdate(String OldPhone,String NewPhone);

    /**
     * KhoaHND
     * find By email
     */
    @Query(value = "select student.student_id as studentId, student.name as name, student.date_of_birth as dateOfBirth, student.phone as phone," +
            "student.grade_id as grade, student.address as address, student.email as email, student.avatar as avatar, student.gender as gender from student where student.email = ?1 and student.delete_flag = 1", nativeQuery = true)
    List<IStudentEditDTO> findStudentByEmail(String email);

    @Query(value = "select student.student_id as studentId, student.name as name, student.date_of_birth as dateOfBirth, student.phone as phone," +
            "student.grade_id as grade, student.address as address, student.email as email, student.avatar as avatar, student.gender as gender from student where (student.email = ?2 and student.email != ?1) and student.delete_flag = 1", nativeQuery = true)
    List<IStudentEditDTO> findStudentByEmailUpdate(String OldEmail,String NewEmail);
}