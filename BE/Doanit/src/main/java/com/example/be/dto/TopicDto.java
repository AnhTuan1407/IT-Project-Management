package com.example.be.dto;

public class TopicDto {
    private Integer id;
    private  String name;
    private  String introduce;
    private  String image;
    private String content;
    private Integer faculty_id;

    public TopicDto() {
    }

    public TopicDto(Integer id, String name, String introduce, String image, String content, Integer faculty_id) {
        this.id = id;
        this.name = name;
        this.introduce = introduce;
        this.image = image;
        this.content = content;
        this.faculty_id = faculty_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getFaculty_id() {
        return faculty_id;
    }

    public void setFaculty_id(Integer faculty_id) {
        this.faculty_id = faculty_id;
    }
}
