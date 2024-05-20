package com.example.be.dto;

import com.example.be.entity.Student;

import java.util.ArrayList;

public class GroupAccountDTO {
    Integer groupaccountId;
    String name;
    ArrayList<Student> students;



    public GroupAccountDTO(Integer id, String name) {
        this.groupaccountId = id;
        this.name = name;
    }

    public GroupAccountDTO() {
    }

    public Integer getId() {
        return groupaccountId;
    }

    public void setId(Integer id) {
        this.groupaccountId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public ArrayList<Student> getStudents() {
        return students;
    }

    public void setStudents(ArrayList<Student> students) {
        this.students = students;
    }
}
