package com.example.be.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)//lưu trữ biểu diễn chuỗi của một giá trị enum,mặc định thi nó là number
    private ERole roleName;


}

