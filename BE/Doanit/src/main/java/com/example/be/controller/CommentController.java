package com.example.be.controller;

import com.example.be.dto.CommentDTO;
import com.example.be.entity.Comment;
import com.example.be.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/public/process-post")
public class CommentController {
    @Autowired
    ICommentService commentService;

    @RequestMapping(value = "comments/{topicProcessId}", method = RequestMethod.GET)
    public ResponseEntity<List<Comment>> findAllComments(@PathVariable("topicProcessId") Integer topicProcessId) {
        List<Comment> comments = commentService.findAllComments(topicProcessId);
        if (comments.isEmpty()) {
            return new ResponseEntity<List<Comment>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
    }

    @RequestMapping(value = "create-comment", method = RequestMethod.POST)
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO) {
        if (commentDTO == null) {
            return new ResponseEntity<CommentDTO>(HttpStatus.BAD_REQUEST);
        } else {
            commentService.createComment(commentDTO);
            return new ResponseEntity<CommentDTO>(commentDTO, HttpStatus.OK);
        }
    }

    @Transactional
    @RequestMapping(value = "/delete-comment/{id}",method = RequestMethod.PATCH)
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        Comment comment = commentService.findCommentById(id);
        if (comment == null) {
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
        commentService.deleteComment(id);
        return new ResponseEntity<Comment>(HttpStatus.OK);
    }

}
