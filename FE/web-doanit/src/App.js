import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
import {ListStudentAd} from "./component/student/ListStudentAd";
import {ListStudentTeacher} from "./component/student/ListStudentTeacher";
import {ListTeacher} from "./component/teacher/listTeacher";
import {Login} from "./component/login/login";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import TopicTable from "./component/topic/TopicTable";
import {Create} from "./component/student/Create-student";
import {RegisterTeacher} from "./component/registerTeacher/RegisterTeacher";
import UpdateTeacher from "./component/teacher/updateTeacher";
import {ResgiterGroupStudent} from "./component/groupstudent/ResgiterGroup";
import NotificationList from "./component/notification/NotificationList";
import ListGroupAccount from "./component/ListGroupAccount/ListGroupAccount";
import {Edit} from "./component/student/Edit-student";
import {ResgiterTopic} from "./component/topic/ResgiterTopic";
import ListTopicNotApproval from "./component/approvalTopic/ListTopicNotApproval";
import {PrivateRouter} from "./routers/PrivateRouter";
import NotFoundPage from "./component/error/NotFoundPage";
import {UserInfo} from "./component/userInfo/user-info";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import ScrollReveal from "scrollreveal";

function App() {
    const navigate = useNavigate();
    const roles = localStorage.getItem("roles");
    const token=localStorage.getItem("token");
    const [showHeaderFooter, setShowHeaderFooter] = useState(true);

    const checkTokenExpiration = () => {
        if (!token) return false;
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        return Date.now() < exp * 1000;
    };

    useEffect(() => {
        if (checkTokenExpiration() && window.location.pathname === "/login") {
            toast.warning("Bạn đã đăng nhập ", {autoClose: 1000});
            setTimeout(() => {
                navigate('/');
            },1500)
        }
    }, [roles]);
    useEffect(() => {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
        });

        sr.reveal(`.footer .row`, {
            origin: 'left',
            interval: 100,
        });
    }, []);
    return (
        <>
            {showHeaderFooter && !window.location.pathname.includes("/login") && <Header />}
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<HomePage/>}></Route>
                {
                    !roles ? (
                        ""
                    ) : roles.includes('ROLE_ADMIN') ? (
                        <>
                            <Route path="/list-teacher" element={
                                <PrivateRouter><ListTeacher/></PrivateRouter>
                            }/>
                            <Route path="/create-teacher" element={
                                <PrivateRouter><CreateTeacher/></PrivateRouter>
                            }/>
                            <Route path="/update-teacher/:id" element={
                                <PrivateRouter> <UpdateTeacher/></PrivateRouter>
                            }/>
                            <Route path="/list-student" element={
                                <PrivateRouter><ListStudentAd/></PrivateRouter>
                            }/>
                            <Route path="/edit-student/:studentId" element={
                                <PrivateRouter> <Edit/></PrivateRouter>
                            }/>
                            <Route path="/create-student" element={
                                <PrivateRouter><Create/></PrivateRouter>
                            }/>
                        </>
                    ) : roles.includes('ROLE_TEACHER') ? (
                        <>
                            <Route path="/user-info" element={
                                <PrivateRouter><UserInfo/></PrivateRouter>
                            }/>
                            <Route path="/list-group" element={
                                <PrivateRouter><ListGroupAccount/></PrivateRouter>
                            }/>
                            <Route path="/list-topic" element={
                                <PrivateRouter><TopicTable/></PrivateRouter>
                            }/>
                            <Route path="/list-student-group" element={
                                <PrivateRouter><ListStudentTeacher/></PrivateRouter>
                            }/>
                            {/*kiểm duyệt đề tài*/}
                            <Route path="/approval-topic" element={
                                <PrivateRouter><ListTopicNotApproval/></PrivateRouter>
                            }/>
                        </>
                    ) : (
                        <>
                            <Route path="/user-info" element={
                                <PrivateRouter><UserInfo/></PrivateRouter>
                            }/>
                            <Route path="/register-group-student" element={
                                <PrivateRouter><ResgiterGroupStudent/></PrivateRouter>
                            }/>
                            <Route path="/register-teacher" element={
                                <PrivateRouter><RegisterTeacher/></PrivateRouter>
                            }/>
                            <Route path="/register-topic" element={
                                <PrivateRouter><ResgiterTopic/></PrivateRouter>
                            }/>
                            <Route path="/notification" element={
                                <PrivateRouter><NotificationList/></PrivateRouter>
                            }/>
                        </>
                    )
                }
                <Route path="*" element={ <NotFoundPage
                    hideHeaderFooter={() => setShowHeaderFooter(!showHeaderFooter)}
                />}/>
            </Routes>
            {showHeaderFooter && !window.location.pathname.includes("/login") && <Footer />}
            <ToastContainer/>
        </>
    );
}

export default App;
