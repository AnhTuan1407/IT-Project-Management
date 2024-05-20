package com.example.be.repository;

import com.example.be.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICommentRepository extends JpaRepository<Comment,Integer> {
    @Query(value = "SELECT comment_id, content, title, time_comment, account_id, delete_flag, parent_comment_id, status, topic_process_id FROM comment WHERE topic_process_id = ?1 AND delete_flag = 0 AND status = 0 ORDER BY time_comment DESC", nativeQuery = true)
    List<Comment> findAllComments(Integer id);

    @Modifying
    @Query(value = "INSERT INTO `comment`(`content`,`time_comment` ,`account_id`, `status`, `delete_flag` , `title` ,`topic_process_id`,`parent_comment_id`) value (?1, ?2, ?3, ?4, ?5, ?6, ?7,?8)", nativeQuery = true)
    void createComment(String content, String dateComment, Integer accountId, Boolean status, Boolean deleteFlag, String title, Integer topicProcessId, Integer parentId);

    @Modifying
    @Query(value = "update `comment` set delete_flag = ?1 where comment_id = ?2", nativeQuery = true)
    void deleteComment(Boolean delete, Integer id);

    Comment findCommentByCommentId(int id);

}
