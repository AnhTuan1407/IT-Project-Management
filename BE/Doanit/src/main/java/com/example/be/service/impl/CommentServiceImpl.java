package com.example.be.service.impl;

import com.example.be.dto.CommentDTO;
import com.example.be.entity.Comment;
import com.example.be.repository.ICommentRepository;
import com.example.be.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements ICommentService {
    @Autowired
    private ICommentRepository commentRepository;

    @Override
    public void createComment(CommentDTO comment) {
        commentRepository.createComment(comment.getContent(), comment.getTimeComment(), comment.getAccountId(), comment.getStatus(), comment.getDeleteFlag(), comment.getTitle(), comment.getTopicProcessId(), comment.getParentId());
    }

    @Override
    public Comment findCommentById(Integer idComment) {
        return commentRepository.findCommentByCommentId(idComment);
    }

    @Override
    public List<Comment> findAllComments(Integer topicProcessId) {
        return commentRepository.findAllComments(topicProcessId);
    }

    @Override
    public void updateComment(Comment comment) {

    }

    @Override
    public void deleteComment(Integer idComment) {
         commentRepository.deleteComment(true,idComment);
    }

}
