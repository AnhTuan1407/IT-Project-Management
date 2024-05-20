package com.example.be.repository;

import com.example.be.dto.IGetTeacherByIdDTO;
import com.example.be.dto.IRegisterTeacherDTO;
import com.example.be.entity.InfoTopicRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface IRegisterTeacherRepository extends JpaRepository<InfoTopicRegister, Integer> {
    @Query(value = "SELECT t.teacher_id teacherId, t.name as name, t.address, t.avatar, t.date_of_birth as dateOfBirth, t.email, t.phone, t.gender, f.name as facultyName, d.name as degreeName,t.delete_flag as deleteFlag  " +
            "FROM teacher t " +
            "JOIN degree d ON d.degree_id = t.degree_id " +
            "JOIN faculty f on f.faculty_id= t.faculty_id " +
            "WHERE t.teacher_id = :teacherId"
            , nativeQuery = true)
    IGetTeacherByIdDTO getTeacherById(Integer teacherId);

    @Modifying
    @Query(value = "UPDATE info_topic_register SET teacher_id = :teacherId where group_account_id = :groupId", nativeQuery = true)
    void registerTeacher(@Param("teacherId") Integer teacherId, @Param("groupId") Integer groupId);

    @Query(value = "SELECT t.teacher_id teacherId, t.name, COUNT(CASE WHEN itr.status = 1 THEN 1 ELSE NULL END) AS countTeacher " +
            "FROM teacher AS t LEFT JOIN info_topic_register AS itr ON t.teacher_id = itr.teacher_id " +
            "where delete_flag = 1 " +
            "GROUP BY t.teacher_id", nativeQuery = true)
    Page<IRegisterTeacherDTO> getListTeacherRegistered(Pageable pageable);
}
