package com.example.be.controller;

import com.example.be.dto.GroupAccountDTO;
import com.example.be.entity.Account;
import com.example.be.entity.GroupAccount;
import com.example.be.entity.Student;
import com.example.be.security.UserPrinciple;
import com.example.be.service.IAccountService;
import com.example.be.service.IGroupAccountService;
import com.example.be.validate.GroupAccountDeadlineValidator;
import com.example.be.service.IStudentService;
import com.example.be.validate.GroupAccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/Group")
public class GroupAccountController {
    @Autowired
    IGroupAccountService IGroupAccountService;

    @Autowired
    GroupAccountValidator groupAccountValidator;
    @Autowired
    IAccountService iAccountService;
    @Autowired
    GroupAccountDeadlineValidator groupAccountDeadlineValidator;
    @Autowired
    IStudentService iStudentService;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/createGroup")
    public ResponseEntity<?> doCreateGroup(@RequestBody GroupAccountDTO groupAccountDto) {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = iAccountService.findByUsername(userPrinciple.getUsername());
        Integer accountId = account.getAccountId();
        Integer studentID = account.getStudent().getStudentId();
        Map<String, String> errors = groupAccountValidator.validate(groupAccountDto);
        Student student = iStudentService.getStudentByID(studentID);
        if (student.getGroupAccount() != null) {
            errors.put("errorDuplicateGroup", "Bạn đã tham gia nhóm rồi");
        }
        if (errors.isEmpty()) {
            IGroupAccountService.saveGroup(groupAccountDto.getName(), studentID, accountId, groupAccountDto.getStudents());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<Map<String, String>>(errors, HttpStatus.BAD_REQUEST);
        }
    }

    //    @PreAuthorize("hasRole('STUDENT')" )
    @GetMapping("/joinGroup")
    public ModelAndView joinGroup(@RequestParam("studentID") Integer studentId, @RequestParam("groupId") Integer groupId) {
        ModelAndView modelAndView = new ModelAndView();
        GroupAccount groupAccount = IGroupAccountService.findById(groupId);
        Student student = iStudentService.getStudentByID(studentId);
//        System.out.println(student.getGroupAccount().getGroupAccountId());

        if (student.getGroupAccount() == null) {
            if (groupAccount.getDelete_flag() == false) {
                modelAndView.setViewName("/view/errorJoin");
            } else {
                IGroupAccountService.acceptJoinGroup(groupId, studentId);
                modelAndView.setViewName("/view/Success");
            }
        } else {
            modelAndView.setViewName("/view/duplicate");
        }
        return modelAndView;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @RequestMapping(value = "list-group", method = RequestMethod.GET)
    public ResponseEntity<Page<GroupAccount>> listGroup(@RequestParam(value = "find", defaultValue = "") String find,
                                                        @RequestParam(value = "page") Integer page) {
        Page<GroupAccount> listGroup = IGroupAccountService.listGroup(find, PageRequest.of(page, 2));
        if (listGroup.isEmpty()) {
            return new ResponseEntity<Page<GroupAccount>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Page<GroupAccount>>(listGroup, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @RequestMapping(value = "delete-group/{groupId}", method = RequestMethod.PATCH)
    public ResponseEntity<?> deleteGroup(@PathVariable("groupId") Integer groupId,
                                         @RequestBody List<Integer> listIdStudent) throws MessagingException, UnsupportedEncodingException {
//        this.IGroupAccountService.sendStudentDelete(IGroupAccountService.findById(groupId));
        this.IGroupAccountService.deleteGroup(groupId, listIdStudent);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @RequestMapping(value = "accept-group/{groupId}", method = RequestMethod.PATCH)
    public ResponseEntity<?> acceptGroup(@PathVariable("groupId") Integer groupId) throws MessagingException, UnsupportedEncodingException {
        this.IGroupAccountService.acceptGroup(groupId);
        this.IGroupAccountService.sendStudentAccept(IGroupAccountService.findById(groupId));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @RequestMapping(value = "create-deadline/{groupId}/{date}", method = RequestMethod.PATCH)
    public ResponseEntity<?> createDeadline(@PathVariable("date") String date,@PathVariable("groupId")Integer groupId){
        Map<String,String> errors=groupAccountDeadlineValidator.dateValidate(LocalDateTime.parse(date));
        if(errors.isEmpty()) {
            this.IGroupAccountService.updateDeadLine(date, groupId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
    }
}
