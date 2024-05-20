package com.example.be.controller;

import com.example.be.dto.GetTeacherByIdDTO;
import com.example.be.dto.IGetTeacherByIdDTO;
import com.example.be.dto.IRegisterTeacherDTO;
import com.example.be.entity.Account;
import com.example.be.entity.InfoTopicRegister;
import com.example.be.repository.IInfoTopicRegisterRepository;
import com.example.be.security.UserPrinciple;
import com.example.be.service.IAccountService;
import com.example.be.service.IRegisterTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/registerTeacher")
public class RegisterTeacherController {

    @Autowired
    private IRegisterTeacherService iRegisterTeacherService;
    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private IInfoTopicRegisterRepository iInfoTopicRegister;

    @PreAuthorize("hasRole('GROUP_LEADER')")
    @PostMapping("/register/{teacherId}")
    public ResponseEntity<?> registerTeacher(@PathVariable Integer teacherId) {
        if (iRegisterTeacherService.getTeacherById(teacherId).getDeleteFlag() == false) {
            return new ResponseEntity<>("Không tìm thấy giáo viên!!", HttpStatus.BAD_REQUEST);
        }
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        int groupId=account.getStudent().getGroupAccount().getGroupAccountId();
        InfoTopicRegister infoTopicRegister= iInfoTopicRegister.findByGroupAccountId(groupId);
        if (infoTopicRegister.getTeacher()!=null){
            return new ResponseEntity<>("Bạn đã đăng ký giáo viên rồi!!", HttpStatus.BAD_REQUEST);
        }
        if (infoTopicRegister.getTopic() == null){
            return new ResponseEntity<>("Bạn chưa đăng kí đề tài!!", HttpStatus.BAD_REQUEST);
        }
        iRegisterTeacherService.registerTeacher(teacherId,groupId);
        return new ResponseEntity<>("Đăng kí thành công",HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('STUDENT', 'GROUP_LEADER')")
    @GetMapping(value = "/list" )
    public ResponseEntity<?> getRegisterService(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Page<IRegisterTeacherDTO> teacher = iRegisterTeacherService.getListTeacherRegistered(PageRequest.of(page, 3));
        if (teacher.isEmpty()){
            return new ResponseEntity<>("Hiện tại không có giáo viên!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(teacher, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('STUDENT', 'GROUP_LEADER')")
    @GetMapping("/findByIdTeacher/{id}")
    public ResponseEntity<?> getByIdTeacher(@PathVariable Integer id) {
        IGetTeacherByIdDTO item = iRegisterTeacherService.getTeacherById(id);
        GetTeacherByIdDTO data = new GetTeacherByIdDTO();
        data.setTeacherId(item.getTeacherId());
        data.setAddress(item.getAddress());
        data.setAvatar(item.getAvatar());
        data.setDateOfBirth(item.getDateOfBirth());
        data.setEmail(item.getEmail());
        data.setPhone(item.getPhone());
        data.setName(item.getName());
        data.setDegreeName(item.getDegreeName());
        data.setFacultyName(item.getFacultyName());
        data.setGender(item.getGender());
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        int groupId=account.getStudent().getGroupAccount().getGroupAccountId();
        InfoTopicRegister infoTopicRegister= iInfoTopicRegister.findByGroupAccountId(groupId);
        if (infoTopicRegister.getTeacher()!=null){
            data.setTopicRegisterFlag(true);
        }

        if (item==null){
            return new ResponseEntity<>("Không tìm thấy giáo viên", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
