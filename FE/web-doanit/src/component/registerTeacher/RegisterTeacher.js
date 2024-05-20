import './RegisterTeacher.css'
import {useEffect, useState} from "react";
import * as ListRegisterTeacherService from "../../service/RegisterTeacherService";
import {toast} from "react-toastify";
import {Button} from 'react-bootstrap';
import {storage} from "../../config/firebaseConfig";

export function RegisterTeacher() {
    const [pageNumber, setPageNumber] = useState(0);
    const [targetPage, setTargetPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageCount = totalPages;
    const [registerTeacher, setRegisterTeacher] = useState([]);
    const [inforTeacher, setInforTeacher] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const roles = localStorage.getItem("roles");
    const [buttonFlag, setButtonFlag] = useState(false);
    const getAvatarFromFirebase = async (avatarName) => {
        if (!avatarName) return null;
        try {
            const downloadUrl = await storage.ref(avatarName).getDownloadURL();
            return downloadUrl;
        } catch (error) {
            console.error("Error fetching avatar from Firebase:", error);
        }
    };

    const handleShow = (id, count) => {
        if (count === 5) {
            setButtonFlag(true);
        } else {
            setButtonFlag(false);
        }
        setShowModal(true);
        getInforTeacher(id);
    }

    useEffect(() => {
        fetchApi();
    }, [pageNumber, inforTeacher])

    const fetchApi = async () => {
        try {
            const result = await ListRegisterTeacherService.findAll(pageNumber);
            setTotalPages(result.totalPages);
            setRegisterTeacher(result.content || []);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.warning(error.response.data);
            } else {
                toast.error("Có lỗi xảy ra ");
            }
        }
    }
    const getInforTeacher = async (id) => {
        try {
            const result = await ListRegisterTeacherService.findByIdTeacher(id);
            if (result.avatar) {
                const imageUrl = await getAvatarFromFirebase(result.avatar);
                setAvatarUrl(imageUrl);
            }
            setInforTeacher(result || []);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setInforTeacher("");
                toast(error.response.data);
            } else {
                toast.error("Có lỗi xảy ra ");
            }
        }
    }
    const register = async (teacherId) => {
        try {
            await ListRegisterTeacherService.registerTeacher(teacherId);
            toast.success("Đăng ký thành công");

            setShowModal(false)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.warning(error.response.data);
                setInforTeacher("");
            } else {
                toast.error("Có lỗi xảy ra ");
            }
        }
    };
    return (
        <>
            <div className="register-teacher" style={{marginTop: "90px"}}>
                <div className="container">
                    <h2 className="title">DANH SÁCH GIÁO VIÊN HƯỚNG DẪN</h2>
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="row-scope">
                                <th className="title-table" scope="col">STT</th>
                                <th className="title-table" scope="col">Tên</th>
                                <th className="title-table" scope="col">Số lượng đăng kí</th>
                                <th className="title-table" scope="col">Đăng kí</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                registerTeacher.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.teacherId}</td>
                                        <td className="row-name">{item.name}</td>
                                        <td>{item.countTeacher}/5</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => handleShow(item.teacherId, item.countTeacher)}>
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-7 justify-content-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                        onClick={() => setPageNumber((prevPage) => {
                                            const newPageNumber = Math.max(prevPage - 1, 0)
                                            setTargetPage(newPageNumber);
                                            return newPageNumber
                                        })
                                        }
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only"></span>
                                    </a>
                                </li>
                                <li className="page-item">
                <span className="input-group">
                  <input
                      type="number" value={targetPage + 1}
                      onChange={(e) => setTargetPage(parseInt(e.target.value, 10) - 1)}
                      className="form-control input-sm" min={1} max={pageCount}
                  />
                  <span className="input-group-text">/{pageCount}</span>
                  <button className="btn btn-primary btn-sm"
                          onClick={() => setPageNumber(Math.max(Math.min(targetPage, pageCount - 1), 0))}>Go
                  </button>
                </span>
                                </li>
                                <li className={`page-item ${pageNumber === totalPages - 1 ? "disabled" : ""}`}>
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Next"
                                        onClick={() => setPageNumber((prevPage) => {
                                            const newPageNumber = Math.min(prevPage + 1, totalPages - 1);
                                            setTargetPage(newPageNumber);
                                            return newPageNumber;
                                        })}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only"></span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="mt-3 save-exit-buttons">
                    <div className="modal fade" id="exampleModal" tabIndex="-1"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">THÔNG TIN GIÁO VIÊN</h5>
                                    <button type="reset" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-3 mr-2">
                                            <div className="avatar-container" style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%"
                                            }}>
                                                <img
                                                    className="avatar"
                                                    alt="avatar"
                                                    src={avatarUrl || "default-avatar.png"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mr-5">
                                            <div className="form-group">
                                                <label htmlFor="name" style={{color: "black", fontWeight: "bold"}}>Tên
                                                    Giáo Viên</label>
                                                <input type="text" className="form-control"
                                                       id="name2" value={inforTeacher.name}
                                                       readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dob" style={{color: "black", fontWeight: "bold"}}>Ngày
                                                    Sinh</label>
                                                <input type="date" className="form-control"
                                                       id="dob2" value={inforTeacher.dateOfBirth} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email"
                                                       style={{color: "black", fontWeight: "bold"}}>Email</label>
                                                <input type="email" className="form-control"
                                                       id="email2" value={inforTeacher.email}
                                                       readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address" style={{color: "black", fontWeight: "bold"}}>Địa
                                                    Chỉ</label>
                                                <input type="text" className="form-control"
                                                       id="address2"
                                                       value={inforTeacher.address}
                                                       readOnly/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="gender" style={{color: "black", fontWeight: "bold"}}>Giới
                                                    Tính</label>
                                                <input type="text" className="form-control"
                                                       id="gender2" value={inforTeacher.gender ? "Nam" : "Nữ"}
                                                       readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone" style={{color: "black", fontWeight: "bold"}}>Số
                                                    Điện Thoại</label>
                                                <input type="tel" className="form-control"
                                                       id="phone2" value={inforTeacher.phone} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="department"
                                                       style={{color: "black", fontWeight: "bold"}}>Khoa</label>
                                                <input type="tel" className="form-control"
                                                       id="department2" value={inforTeacher.facultyName} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="degree" style={{color: "black", fontWeight: "bold"}}>Học
                                                    Vị</label>
                                                <input type="text" className="form-control"
                                                       id="degree2" value={inforTeacher.degreeName} readOnly/>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="reset" className="btn btn-outline-secondary"
                                            style={{marginRight: "7px", marginTop: "5px"}}
                                            data-bs-dismiss="modal">Thoát
                                    </button>
                                    {
                                        roles.includes("ROLE_GROUP_LEADER") && !inforTeacher.topicRegisterFlag && !buttonFlag &&
                                        <Button variant="outline-success" style={{marginRight: "7px", marginTop: "5px"}}
                                                onClick={() => register(inforTeacher.teacherId)}
                                                data-bs-dismiss="modal">
                                            Đăng kí
                                        </Button>

                                    }
                                    {
                                        roles.includes("ROLE_GROUP_LEADER") && inforTeacher.topicRegisterFlag &&
                                        <Button variant="outline-success" style={{marginRight: "7px", marginTop: "5px"}}
                                                disabled>
                                            Đã đăng kí
                                        </Button>
                                    }
                                    {
                                        roles.includes("ROLE_GROUP_LEADER") && buttonFlag && !inforTeacher.topicRegisterFlag &&
                                        <Button variant="outline-success" style={{marginRight: "7px", marginTop: "5px"}}
                                                disabled>
                                            Hết chỗ đăng kí
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
