package com.example.be.repository;

import com.example.be.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface ITopicManagerRepository extends JpaRepository<Topic, Integer> {

    @Query(value = "SELECT t.topic_id, t.content, t.delete_flag, t.image, t.introduce, t.faculty_id, t.name , f.name AS faculty_name " +
            "FROM doanit.topic t " +
            "JOIN doanit.faculty f ON t.faculty_id = f.faculty_id", nativeQuery = true)
    Page<Topic> findAllTopic(Pageable pageable);

    @Query(value = "SELECT t.topic_id, t.content, t.delete_flag, t.image, t.introduce, t.faculty_id, t.name , f.name AS faculty_name " +
            "FROM doanit.topic t " +
            "JOIN doanit.faculty f ON t.faculty_id = f.faculty_id" +
            " WHERE t.delete_flag = ?1 AND t.name LIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    Page<Topic> findAllTopicByName(Boolean delete , String name, Pageable pageable);

    @Query(value = "SELECT t.topic_id, t.content, t.delete_flag, t.image, t.introduce, t.faculty_id, t.name , f.name AS faculty_name " +
            "FROM doanit.topic t " +
            "JOIN doanit.faculty f ON t.faculty_id = f.faculty_id" +
            " WHERE t.topic_id = ?1", nativeQuery = true)
    Topic findByIdTopic(Integer id);

    @Modifying
    @Query(value = "UPDATE `topic` SET `delete_flag` = ?1 WHERE (`topic_id` = ?2)", nativeQuery = true)
    void deleteTopic(Boolean deleteFlag, Integer id);

    @Modifying
    @Query(value = "INSERT INTO `topic_process` (" +
            "`date_start`, `date_end`, `percent_process`, " +
            "`process_number`, `status`, `info_topic_register_id`) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6) ", nativeQuery = true)
    void createTopicProcess(String dateStart, String dateEnd, Integer percentProcess,
                            Integer processNumber, Boolean status, Integer infoTopicRegister);

    @Modifying
    @Query(value = "UPDATE info_topic_register` SET `status` = ?1,`teacher_id` = ?2  WHERE (`topic_id` = ?3);",nativeQuery = true)
    void statusInfo(Boolean status, Integer teacherId, Integer id);
}