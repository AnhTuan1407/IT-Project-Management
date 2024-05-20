package com.example.be.repository;


import com.example.be.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Transactional
public interface TopicRepository extends JpaRepository<Topic, Integer> {

//    @Query(
//            value = "Insert into topic(`name`,introduce,image,`content`,delete_flag,faculty_id) value (?1,?2,?3,?4,false,?5)",
//            nativeQuery = true
//    )
//    void saveTopic(String name, String introduce, String image, String content, Integer facultyId);

    @Query(value = "SELECT * FROM topic ",
            nativeQuery = true)
    Page<Topic> findAllByTopic(Pageable pageable);

    @Query(value = "SELECT * FROM topic where delete_flag = ?1 and topic.name like %?2%",
            nativeQuery = true)
    Page<Topic> findAllByTopicFind(Boolean delete, String name, Pageable pageable);
    ArrayList<Topic> findTopicByName(String name);
}
