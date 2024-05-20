import "../groupstudent/ResgiterGroup.css"
import {toast} from "react-toastify";
import * as StudentService from "../../service/StudentService"
import {save} from "../../service/GroupAccountService";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {storage} from "../../config/firebaseConfig";
import * as Yup from "yup"
import React, {useEffect, useState} from "react";
import {Field, Form, Formik, ErrorMessage, useFormikContext} from "formik";
import {useNavigate} from "react-router-dom";
import {ca} from "date-fns/locale";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";

export function ResgiterGroupStudent() {
    const navigate = useNavigate();
    const [listAdd, setListAdd] = useState([]);
    const [students, setStudents] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [targetPage, setTargetPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageCount = totalPages;
    const [searchKey, setSearchKey] = useState("");
    const [searchKeyTmp, setSearchKeyTmp] = useState("");
    const [avatarUrls, setAvatarUrls] = useState([]);
    const [errs, setErrs] = useState({});
    const [isNameTouched, setIsNameTouched] = useState(true);
    const handleNameTouched = () => {
        setIsNameTouched(false);
    };
    // ===========avatar======
    const fetchAvatars = async () => {
        try {
            const avatarUrls = await Promise.all(students.map(async (s) => {
                if (s.avatar) {
                    const downloadUrl = await storage.ref(s.avatar).getDownloadURL();
                    return downloadUrl;
                } else {
                    return null;
                }
            }));
            setAvatarUrls(avatarUrls);
        } catch (error) {
            console.error("Error fetching avatars from Firebase:", error);
        }
    };
    useEffect(() => {
        fetchAvatars();
    }, [students]);
    // ===================================
    // const navigate = useNavigate();
    //================================Call BE=======================
    useEffect(() => {
            const fetchApi = async () => {
                try {
                    const result = await StudentService.findAll(pageNumber, searchKey)
                    setStudents(result.content);
                    setTotalPages(result.totalPages);
                    // const resultGrade = await GradeService.findAll();
                    // setGrades(resultGrade);
                    // const resultFaculty = await FacultyService.findAll();
                    // setFaculties(resultFaculty)
                } catch (error) {
                    // Handle errors from the API call
                    console.error('Error fetching data:', error);
                    // You can set students to an empty array or display an error message
                    setStudents([]);
                    setTotalPages(0);
                }
            }
            fetchApi()
        }, [pageNumber, searchKey]
    )

    //============================Them List============================
    function removeProduct(student) {
        setListAdd(listAdd.filter(item => item !== student))
    }

    ////////////////////////////////////////////////////
    function addProduct(student) {
        // console.log(product)
        // const index=listAdd.indexOf(student);
        if (!listAdd.includes(student))
            setListAdd(prevState => [...prevState, student])
    }

    //====================Search=============================
    const handleSearch = () => {
        setSearchKey(searchKeyTmp);
    };


    return (
        <>
            <div className="resgiterGroup">
                {/*===================Danh Sach Sinh Vien=============*/}
                <div className="container containerTan">
                    <h2 className="mt-4 mb-4" style={{marginTop: "80px"}}>Đăng ký nhóm sinh viên</h2>
                    {/*====================search==============*/}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8">
                            </div>
                            <div className="col-4">
                                <div className="input-group mb-3 rounded-pill border p-2">
                                    <input type="text" className="form-control border-0" placeholder="Tìm kiếm"
                                           aria-label="Tìm kiếm"
                                           aria-describedby="button-addon2"
                                           value={searchKey}
                                           onChange={(e) => setSearchKeyTmp(e.target.value)}
                                           maxLength={30}/>
                                    <button
                                        className="btn btn-outline-secondary border-0  btn-hover-none rounded-circle"
                                        type="button"
                                        id="button-addon2"
                                        onClick={handleSearch}
                                    ><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {students.length === 0 ?
                            <h1 className="text-center">Dữ liệu không tồn tại </h1>
                            : <>
                                {students.map((s, index) => (
                                    <div className="col-md-3 mb-4" key={index}>
                                        <div className="card cardTan">
                                            <LazyLoadImage
                                                effect="blur" src={avatarUrls[index]} className="KhoiAnh"
                                                alt={`Sinh viên ${s.index}`} width="100%"
                                            />
                                            <div className="card-body white">
                                                <h5 className="card-title card-titleTan student-name">{s.name}</h5>
                                                <p className="card-text card-textTan "><b> <i
                                                    className="bi bi-code-square"></i> MSV:</b> {"MSV".concat(s.studentId.toString().padStart(4, "0"))}
                                                </p>
                                                <p className="card-text card-textTan"><b><i
                                                    className="bi bi-window-sidebar"></i> Ngày
                                                    sinh:</b> {s.dateOfBirth}</p>
                                            </div>
                                            <div className="card-footer" style={{height: "90px"}}>
                                                <div style={{textAlign: "center"}}>
                                                    <button onClick={fn => addProduct(s)}
                                                            className="btn btn-outline-success"
                                                            style={{marginTop: "15px"}}>Đăng ký
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                      type="number"
                      value={targetPage + 1}
                      onChange={(e) => setTargetPage(parseInt(e.target.value, 10) - 1)}
                      className="form-control input-sm"
                      min={1}
                      max={pageCount}
                  />
                  <span className="input-group-text">/{pageCount}</span>
                  <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setPageNumber(Math.max(Math.min(targetPage, pageCount - 1), 0))}>
                    Go
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

                            </>
                        }
                    </div>
                </div>
                {/*===================Danh Sach Thanh Vien=============*/}

                <h2 className="title titleTan" style={{color: "#e9f1e8"}}>Danh sách thành viên nhóm</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead className="table">
                                <tr className="row-scope row-scopeTan">
                                    <td style={{backgroundColor: "#b9daa4"}}>Mã sinh viên</td>
                                    <td style={{backgroundColor: "#b9daa4"}}>Tên sinh viên</td>
                                    <td style={{backgroundColor: "#b9daa4"}}>Ngày sinh</td>
                                    <td style={{backgroundColor: "#b9daa4"}}>Chọn</td>
                                </tr>
                                </thead>
                                <tbody className="row-tbody row-tbodyTan">
                                {listAdd.map(student => (
                                    <tr key={student.studentId}>
                                        <td> {"MSV".concat(student.studentId.toString().padStart(4, "0"))}</td>
                                        <td>{student.name}</td>
                                        <td>{student.dateOfBirth}</td>
                                        <td>
                                            <button onClick={fn => removeProduct(student)}
                                                    className='btn btn-danger'>Remove
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
                    {/*============tim kiem========================*/}
                    <Formik initialValues={{
                        groupAccount: {
                            id: 1,
                            name: "",
                            students: listAdd,
                        },

                    }} onSubmit={async (values) => {
                        try {
                            values.groupAccount.students = listAdd;
                            console.log(values.groupAccount.students.length);
                            if (values.groupAccount.students.length !== 3) {
                                // Display toast message for not having enough students
                                toast.error('❌ Please select at 4 students for the group.');
                                return;
                            }
                            if (errs.errorDuplicateGroup) {
                                toast.error(errs.errorDuplicateGroup)
                                navigate("/")
                            }
                            values.groupAccount.students = students;
                            console.log(values);
                            setIsNameTouched(true);
                            const res = await save(values.groupAccount)
                            if (res !== null) {
                                setErrs(res)
                            } else {
                                navigate("/")
                                toast.success('🦄 Resgiter Group successfully!!!!');
                            }

                        } catch (error) {
                            console.error('Error submitting form:', error);
                            toast.error('❌ Failed to register group. Please try again later.');
                        }

                    }} validationSchema={Yup.object({
                        groupAccount: Yup.object({
                            name: Yup.string()
                                .required("Tên nhóm không được để trống")
                                .min(5, "Tên phải nhiều hơn 5 ký tự")
                                .max(255, "Tên không vượt quá 255 ký tự")
                                .matches(/^[a-zA-Z\s]+$/, "Tên nhóm không được chứa ký tự đặc biệt"),
                            // students:Yup.array()
                            //     .min(3,"nhóm phải có 4 người")

                        })
                    })}
                    >
                        <Form>
                            <div>
                                <div hidden>
                                    <Field name="groupAccount.id" value="1"></Field>
                                    <Field name="groupAccount.students" value="[]"></Field>

                                </div>


                                <ErrorMessage name="groupAccount.students" className="text-danger" component="p"/>
                                <Field type="text" className="form-control" placeholder="Nhập vào tên nhóm"
                                       name="groupAccount.name"
                                       aria-label="Username"
                                       aria-describedby="basic-addon1">
                                    {({field, form, meta}) => (
                                        <div>
                                            <input className="form-control" onFocus={handleNameTouched}
                                                   type="text" {...field} />

                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="groupAccount.name" className="text-danger" component="p"/>
                                {errs.errorNameGroupDuplicate && isNameTouched && (
                                    <div>
                                        <span className="span-custom"
                                              style={{color: "#dc3545"}}>{errs.errorNameGroupDuplicate}</span>
                                    </div>
                                )}

                            </div>
                            <br/>
                            <div style={{textAlign: "center"}}>
                                <button type="submit" className="btn btn-outline-success">Đăng ký nhóm</button>
                            </div>
                        </Form>
                    </Formik>

                </div>
                <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </div>
            <br/>
        </>
    )


}

