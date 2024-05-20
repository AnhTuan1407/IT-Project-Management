package com.example.be.controller;

import com.example.be.entity.Faculty;
import com.example.be.service.IFacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")

public class FacultyController {
    @Autowired
    IFacultyService iFacultyService;
    /**
     * Find all faculty
     */
    @PreAuthorize("hasAnyRole('TEACHER','ADMIN')" )
    @RequestMapping(value = "/get-all-faculty", method = RequestMethod.GET)
    public ResponseEntity<List<Faculty>> getAllFaculty(){
        List<Faculty> listFaculty = iFacultyService.getAllFaculty();
        if (listFaculty.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(listFaculty,HttpStatus.OK);
    }

}
