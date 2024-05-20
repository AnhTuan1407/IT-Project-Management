import React, {useEffect, useState} from 'react';
import '../assets/js/PageEffect'
import '../pages/homepage.css'

import {
    initMenuEffects

} from "../assets/js/PageEffect"
import {Link, useNavigate} from "react-router-dom";
import {storage} from "../config/firebaseConfig";
// import "default-avatar.png" from "../component/image/default-avatar.png";
const Header = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    const getAvatarFromFirebase = async (avatarName) => {
        if (!avatarName) return null;
        try {
            const downloadUrl = await storage.ref(avatarName).getDownloadURL();
            return downloadUrl;
        } catch (error) {
            console.error("Error fetching avatar from Firebase:", error);
            throw error;
        }
    };

    const getAvatar = async () => {
        const avatar = localStorage.getItem("avatar");
        try {
            if (avatar) {
                const imageUrl = await getAvatarFromFirebase(avatar);
                setAvatarUrl(imageUrl);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        setRoles(localStorage.getItem("roles"));
        getAvatar();

        // Gọi các hàm khởi tạo hiệu ứng từ PageEffects
        initMenuEffects();
    }, []); // useEffect chỉ chạy một lần khi component được tạo


    return (
        <>
            <header className="header" id="header">
                <nav className="nav khang-container">
                    <Link to="/" className="nav__logo">
                        <img src={`${process.env.PUBLIC_URL}/assets/img/logo.jpg`} alt=""/>
                        <h1>DoanIT</h1>
                    </Link>
                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link to="/" className="nav__link active-link">Trang chủ</Link>
                            </li>

                            {
                                window.location.pathname === "/" &&
                                <li className="nav__item">
                                    <a href="#news" className="nav__link">Tin tức</a>
                                </li>
                            }

                            {
                                !roles ? ("") :
                                    roles.includes('ROLE_ADMIN') ? (
                                        <li>
                                            <a href="#" className="nav__link">Chức năng <i
                                                className="fas fa-caret-down"></i></a>
                                            <div className="dropdown-menu">
                                                <ul>
                                                    <li><Link to="/list-teacher">Danh sách giáo viên</Link></li>
                                                    <li><Link to="/list-student">Danh sách sinh viên</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    ) : roles.includes('ROLE_TEACHER') ? (
                                        <li className="nav__item">
                                            <a href="#" className="nav__link">Chức năng<i
                                                className="fas fa-caret-down"></i></a>
                                            <div className="dropdown-menu">
                                                <ul>
                                                    <li><Link to="/list-topic">Danh sách đề tài</Link></li>
                                                    <li><Link to="/list-group">Quản lý nhóm sinh viên</Link></li>
                                                    <li><Link to="/list-student-group">Danh sách sinh viên</Link></li>
                                                    <li><Link to="/approval-topic">Kiểm duyệt đề tài</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <a href="#" className="nav__link">Chức năng <i
                                                className="fas fa-caret-down"></i></a>
                                            <div className="dropdown-menu">
                                                <ul>
                                                    <li><Link to="/register-group-student">Đăng ký nhóm sinh viên</Link>
                                                    </li>
                                                    {
                                                        roles.includes("ROLE_GROUP_LEADER") &&
                                                        <li><Link to="/register-topic">Đăng ký đề tài</Link></li>
                                                    }
                                                    <li><Link to="/register-teacher">Danh sách giáo viên hướng dẫn</Link>
                                                    </li>
                                                    <li><Link to="/notification">Thông tin hướng dẫn</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    )
                            }
                            {
                                roles ?
                                    <li className="nav__item">
                                        <img className="user-avatar" alt="avatar" src={avatarUrl ||"default-avatar.png" }/>
                                        <div style={{ display: "inline-block" }}>
                                            <Link to="/" className="nav__link">
                                                {localStorage.getItem("username")} <i className="fas fa-caret-down"></i>
                                            </Link>
                                        </div>
                                        <div className="dropdown-menu">
                                            <ul>
                                                {
                                                    !roles.includes("ROLE_ADMIN") &&
                                                    <li><Link to="/user-info" className="nav__link">Xem thông
                                                        tin</Link></li>
                                                }
                                                <li className="nav__item">
                                                    <Link to="/login" className="nav__link"
                                                          onClick={() => {
                                                              localStorage.clear();
                                                              navigate("/");
                                                          }}>Đăng Xuất</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    :
                                    <li className="nav__item">
                                        <Link to="/login" className="nav__link">Đăng nhập</Link>
                                    </li>
                            }
                        </ul>
                        <div className="nav__close" id="nav-close">
                            <i className="ri-close-line"></i>
                        </div>
                    </div>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className="ri-function-line"></i>
                    </div>
                </nav>
            </header>
        </>

    );
};

export default Header;