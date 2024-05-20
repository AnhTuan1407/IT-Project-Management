package com.example.be.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetTeacherByIdDTO {
    private Integer teacherId;
    private String address;
    private String avatar;
    private String dateOfBirth;
    private String email;
    private String name;
    private String phone;
    private String degreeName;
    private String facultyName;
    private Boolean gender;
    private Boolean topicRegisterFlag;
}
