package com.example.be.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "groupAccountId")
@Entity
@Table(name = "group_account")
public class GroupAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_account_id")
    private Integer groupAccountId;

    private String name;

    private Boolean delete_flag;

    private Boolean status;

    @Column(columnDefinition = "DATE")
    private String date;

    @OneToMany(mappedBy = "groupAccount")
    private List<Student> studentList;

    @OneToMany(mappedBy = "groupAccount")
    private List<InfoTopicRegister> infoTopicRegisterList;

    public GroupAccount() {
    }

    public GroupAccount(String name, Boolean delete_flag) {
        this.name = name;
        this.delete_flag = delete_flag;
    }

    public GroupAccount(Integer groupAccountId, String name, Boolean delete_flag, Boolean status, String date, List<Student> studentList, List<InfoTopicRegister> infoTopicRegisterList) {
        this.groupAccountId = groupAccountId;
        this.name = name;
        this.delete_flag = delete_flag;
        this.status = status;
        this.date = date;
        this.studentList = studentList;
        this.infoTopicRegisterList = infoTopicRegisterList;
    }

    public Integer getGroupAccountId() {
        return groupAccountId;
    }

    public void setGroupAccountId(Integer groupAccountId) {
        this.groupAccountId = groupAccountId;
    }

    public Boolean getDelete_flag() {
        return delete_flag;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDelete_flag() {
        return delete_flag;
    }

    public void setDelete_flag(Boolean delete_flag) {
        this.delete_flag = delete_flag;
    }

    public Boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Student> getStudentList() {
        return studentList;
    }

    public void setStudentList(List<Student> studentList) {
        this.studentList = studentList;
    }

    public List<InfoTopicRegister> getInfoTopicRegisterList() {
        return infoTopicRegisterList;
    }

    public void setInfoTopicRegisterList(List<InfoTopicRegister> infoTopicRegisterList) {
        this.infoTopicRegisterList = infoTopicRegisterList;
    }
}
