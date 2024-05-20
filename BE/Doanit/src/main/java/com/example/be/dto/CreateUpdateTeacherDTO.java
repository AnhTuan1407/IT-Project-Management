package com.example.be.dto;

public class CreateUpdateTeacherDTO{
        private Integer teacherId;
        private String name;
        private String dateOfBirth;
        private String address;
        private String phone;
        private String email;
        private Integer facultyId;
        private Integer degreeId;
        private String avatar;
        private Boolean gender;
        private Integer accountId;


        public CreateUpdateTeacherDTO() {
        }

    public CreateUpdateTeacherDTO(Integer id, String name, String dateOfBirth, String address, String phone, String email, Integer facultyId, Integer degreeId, String avatar, Boolean gender, Integer accountId) {
        this.teacherId = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.facultyId = facultyId;
        this.degreeId = degreeId;
        this.avatar = avatar;
        this.gender = gender;
        this.accountId = accountId;
    }

    public Integer getTeacherId() {
            return teacherId;
        }

        public void setTeacherId(Integer teacherId) {
            this.teacherId = teacherId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(String dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Integer getFacultyId() {
            return facultyId;
        }

        public void setFaculty(Integer facultyId) {
            this.facultyId = facultyId;
        }

        public Integer getDegreeId() {
            return degreeId;
        }

        public void setDegree(Integer degreeId) {
            this.degreeId = degreeId;
        }

        public String getAvatar() {
            return avatar;
        }

        public void setAvatar(String avatar) {
            this.avatar = avatar;
        }

        public Boolean getGender() {
            return gender;
        }

        public void setGender(Boolean gender) {
            this.gender = gender;
        }

        public Integer getAccountId() {
            return accountId;
        }

        public void setAccountId(Integer accountId) {
            this.accountId = accountId;
        }
}
