package com.example.be.repository;

import com.example.be.dto.IInfoTopicDTO;
import com.example.be.entity.InfoTopicRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface IInfoTopicRegisterRepository extends JpaRepository<InfoTopicRegister,Integer> {
    @Query(value = "SELECT * FROM info_topic_register itr WHERE itr.group_account_id= :groupId", nativeQuery = true)
    InfoTopicRegister findByGroupAccountId(Integer groupId);

    @Query(value = "SELECT *  " +
            "FROM info_topic_register as itr " +
            " WHERE itr.teacher_id = :teacherId AND itr.`status` = false ", nativeQuery = true)
    Page<InfoTopicRegister> findAllTopicNotApprovalByTeacherId(@Param("teacherId") Integer teacherId, Pageable pageable);

    @Modifying
    @Query(value = "UPDATE `info_topic_register` SET `topic_cancel` = ?1 WHERE (`info_topic_register_id` = ?2) ", nativeQuery = true)
    void topicCancel(Boolean topicCancel, Integer id);

    @Modifying
    @Query(value = "UPDATE `info_topic_register` SET `status` = ?1 WHERE (`info_topic_register_id` = ?2) ", nativeQuery = true)
    void approvalCancel(Boolean status, Integer id);

    @Modifying
    @Query(value = "UPDATE `info_topic_register` SET `status` = ?1 WHERE (`info_topic_register_id` = ?2) ", nativeQuery = true)
    void approval(Boolean status, Integer id);

    @Query(value = "SELECT itr.info_topic_register_id as infoTopicRegisterId, t.`name` as topicName, t.content as topicContent, t.image as topicImage, g.`name`  as groupName, GROUP_CONCAT(s.name) as studentNames " +
            "FROM info_topic_register itr  " +
            "JOIN topic t ON t.topic_id = itr.topic_id " +
            "JOIN group_account g ON itr.group_account_id = g.group_account_id " +
            "JOIN student s ON s.group_account_id = g.group_account_id  " +
            "WHERE itr.info_topic_register_id = :infoTopicId"
            , nativeQuery = true)
    IInfoTopicDTO getInfoTopicById(@Param("infoTopicId") Integer infoTopicId);
}
