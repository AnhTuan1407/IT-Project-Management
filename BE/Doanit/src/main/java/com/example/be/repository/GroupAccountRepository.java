package com.example.be.repository;


import com.example.be.entity.GroupAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface GroupAccountRepository extends JpaRepository<GroupAccount, Integer> {
    //Save Group
//    @Modifying
//    @Query(
//            value = "insert into group_account(`name`,delete_flag,status) value (?1,false,false)",
//            nativeQuery = true
//    )
//    void saveGroup(String name);

    //Student accept join group
    @Modifying
    @Query(
            value = "update student " +
                    "set group_account_id = ?1 " +
                    "where student_id = ?2",
            nativeQuery = true)
    void agreeJoinGroup(Integer groupId, Integer studentId);

    //find by name
    List<GroupAccount> findByName(String name);

    //Set Group Leader
    @Modifying
    @Query(
            value = "update account_role \n" +
                    "set account_role.role_id = 3\n" +
                    "where account_role.account_id = ?1",
            nativeQuery = true
    )
    void setGroupLeader(Integer studentId);

    @Query(value = " SELECT group_account_id,date,delete_flag,status,name FROM doanit.group_account where delete_flag=0 AND name LIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    Page<GroupAccount> findAllGroup(String find, Pageable pageable);

    @Modifying
    @Query(
            value = "UPDATE `group_account` SET `delete_flag` = 1 WHERE (`group_account_id` = ?1);", nativeQuery = true
    )
    void deleteGroup(Integer groupId);

    @Modifying
    @Query(
            value = "UPDATE `group_account` SET `date` = ?1 WHERE (`group_account_id` = ?2);", nativeQuery = true)
    void updateDeadLine(String date, Integer id);

    @Modifying
    @Query(value = "UPDATE `doanit`.`group_account` SET `status` = 0 WHERE (`group_account_id` = ?1);", nativeQuery = true)
    void acceptGroup(Integer groupId);

    @Modifying
    @Query(
            value = "update student set student.group_account_id = null where student.student_id = ?1",
            nativeQuery = true)
    void deleteGroupOfStudentById(Integer id);
}
