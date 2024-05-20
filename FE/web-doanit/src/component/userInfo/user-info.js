import "./user-info.css";
import React, {useEffect, useState} from "react";
import * as UserService from "../../service/UserService";
import {useNavigate} from "react-router-dom";
import {ChangePasswordModal} from "../changePassword/change-password";
import {toast} from "react-toastify";
import {storage} from "../../config/firebaseConfig";

export const UserInfo = () => {
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({});
    // const [roleNames, setRoleNames] = useState([]);
    const roles=localStorage.getItem("roles");


    const getAvatarFromFirebase = async (avatarName) => {
        if (!avatarName) return null;
        try {
            const downloadUrl = await storage.ref(avatarName).getDownloadURL();
            return downloadUrl;
        } catch (error) {
            console.error("Error fetching avatar from Firebase:", error);

        }
    };
    const fetchData = async () => {
        try {
            const res = await UserService.detailInfo();
            console.log(roles)

            setUser(roles.includes("ROLE_TEACHER") ? res.teacher : res.student);
            if (roles.includes("ROLE_TEACHER")){
                if (res.teacher.avatar) {
                    const imageUrl = await getAvatarFromFirebase(res.teacher.avatar);
                    setAvatarUrl(imageUrl);
                }
            }else {
                if (res.student.avatar) {
                    const imageUrl = await getAvatarFromFirebase(res.student.avatar);
                    setAvatarUrl(imageUrl);
                }
            }

            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate("/login");
            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data);
            } else {
                setUser("");
                setIsLoading(false);
                // throw error;
                toast.error("Có lỗi xảy ra khi xem chi tiết thông tin người dùng");
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="user-info" style={{marginTop:"90px"}}>
            <div className="container">
                <h2 className="title">THÔNG TIN CHI TIẾT</h2>
                {isLoading ? (
                    <div>Đang tải dữ liệu người dùng...</div>
                ) : (
                    <>
                        <div className="row layout" style={{marginBottom:"60px"}} >
                            <div className="col-md-3 mr-2">
                                <div className="avatar-container">
                                    <img className="avatar" alt="avatar" src={avatarUrl ||"default-avatar.png" }/>
                                </div>
                            </div>
                            <div className="col-md-4 mr-5">
                                <UserInfoInput label="Họ và tên" name="name" value={user.name}/>
                                <UserInfoInput label="Ngày sinh" name="dateOfBirth" value={user.dateOfBirth}/>
                                <UserInfoInput label="Email" name="email" value={user.email}/>
                                <UserInfoInput label="Địa chỉ" name="address" value={user.address}/>
                            </div>
                            <div className="col-md-4">
                                <UserInfoInput label="Giới tính" name="gender"
                                               value={user.gender ? "Nam" : "Nữ"}/>
                                <UserInfoInput label="Số điện thoại" name="phone" value={user.phone}/>
                                {
                                    roles.includes("ROLE_TEACHER") ? (
                                        <>
                                            <UserInfoInput label="Khoa" name="faculty" value={user.faculty.name}/>
                                            <UserInfoInput label="Học vị" name="degree" value={user.degree.name}/>
                                        </>
                                    ) : (
                                        <>
                                            <UserInfoInput label="Khoa" name="faculty" value={user.grade.faculty.name}/>
                                            <UserInfoInput label="Lớp" name="grade" value={user.grade.name}/>
                                        </>
                                    )
                                }
                                <ChangePasswordModal showModal={showModal} setShowModal={setShowModal}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
const UserInfoInput = ({label, name, value}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type="text" className="form-control" id={name} value={value} readOnly/>
        </div>
    );
};
