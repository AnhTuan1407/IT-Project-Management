package com.example.be.service;

import com.example.be.dto.CommentDTO;
import com.example.be.entity.Comment;

import java.util.List;

public interface ICommentService {
    void createComment(CommentDTO comment);
    Comment findCommentById(Integer idComment);
    List<Comment> findAllComments(Integer topicProcessId);
    void updateComment(Comment comment);
    void deleteComment(Integer idComment);

}
