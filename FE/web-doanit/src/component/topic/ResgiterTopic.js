import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import "../topic/InforTopicRegister.css";
import * as Yup from "yup"
import {toast} from "react-toastify";
import {save} from "../../service/InforTopicResgiterService";
import {storage} from "../../config/firebaseConfig";
import {useNavigate} from "react-router-dom";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";

export function ResgiterTopic() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('')
    const [moTa, setMoTa] = useState(null);
    const [moTaUrl, setMoTaUrl] = useState('');
    const [errs, setErrs] = useState({});
    const [isNameTouched, setIsNameTouched] = useState(true);
    const handleNameTouched = () => {
        setIsNameTouched(false);
    };
    const onMotaChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setMoTa(event.target.files[0]);
            setMoTaUrl(URL.createObjectURL(event.target.files[0]));
        }
    };
    const handleMotaUpload = async () => {
        try {
            const uploadTask = storage.ref(`${moTa.name}`).put(moTa);
            const snapshot = await uploadTask;
            const downloadUrl = await snapshot.ref.getDownloadURL();

            setMoTaUrl(downloadUrl);
        } catch (error) {
            console.error("Error uploading Mo Ta:", error);
            throw error;
        }
    };
    const onAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAvatar(event.target.files[0]);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    };
    const handleAvatarUpload = async () => {
        try {
            const uploadTask = storage.ref(`${avatar.name}`).put(avatar);
            const snapshot = await uploadTask;
            const downloadUrl = await snapshot.ref.getDownloadURL();

            setAvatarUrl(downloadUrl);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            throw error;
        }
    };
    // const nagivate = useNavigate();
    return (<>
        <Formik
            initialValues=
                {{
                    inforTopicRegisterId: 1, topic: {
                        topicId: null,
                        name: "",
                        introduce: "",
                        image: "",
                        content: "",
                        deleteFlag: null,
                        faculty: null
                    },
                }}
            onSubmit={async values => {
                try {
                    await handleMotaUpload();
                    await handleAvatarUpload();
                    values.topic.image = avatar.name;
                    values.topic.content = moTa.name;
                    setIsNameTouched(true);
                    const res = await save(values);
                    if (res !== null) {
                        setErrs(res)
                    } else {
                        navigate("/register-teacher");
                        toast.success('🦄 Resgiter topic successfully!!!!');
                    }


                } catch (error) {
                    console.log(error);


                }

            }}
            validationSchema={Yup.object({

                topic: Yup.object({
                    name: Yup.string()
                        .required("Tên topic không đươc để trống")
                        .min(5, "Tên phải nhiều hơn 5 ký tự")
                        .max(255, "Tên không vượt quá 255 ký tự")
                        .matches(/^[a-zA-Z\s]+$/, "Tên đề tài không được chứa ký tự đặc biệt"),
                    introduce: Yup.string()
                        .required("Nội dung không được để trống"), // image: Yup.string()
                    //     .required("Hình ảnh không được để trống"),
                    // content: Yup.string()
                    //     .required("Mô tả không được để trống"),
                })


            })}>
            <>
                {/*Giao dien*/}
                <div className="RegisterTopic" style={{marginTop: "90px"}}>
                    <div className="container ">
                        <h2 className="h2Tan" style={{marginTop: "80px"}}>ĐĂNG KÝ ĐỀ TÀI</h2>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                </div>
                                <div className="col-4">
                                    <div className="input-group mb-3 rounded-pill border p-2">
                                        <input type="text" className="form-control border-0" placeholder="Tìm kiếm"
                                               aria-label="Tìm kiếm"
                                               aria-describedby="button-addon2"/>
                                        <button
                                            className="btn btn-outline-secondary border-0  btn-hover-none rounded-circle"
                                            type="button"
                                            id="button-addon2"><i className="bi bi-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-left col-leftTan">
                                <div>
                                    <h5 className="h5Tan">Đăng ký đề tài</h5>
                                    <Form className="form form-register form-registerTan">
                                        <div hidden>
                                            <Field name="inforTopicRegisterId" value="1"/>

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label ">Tên đề tài(<span
                                                className="text-danger">*</span>)</label>
                                            <Field name="topic.name" className="form-control" type="text"
                                                   placeholder="Tên đề tài">
                                                {({field, form, meta}) => (
                                                    <div>
                                                        <input className="form-control" onFocus={handleNameTouched}
                                                               type="text" {...field} />

                                                    </div>
                                                )}
                                            </Field>
                                            {errs.errorNameDuplicate && isNameTouched && (
                                                <div>
                                                    <span className="span-custom"
                                                          style={{color: "#dc3545"}}>{errs.errorNameDuplicate}</span>
                                                </div>
                                            )}
                                            <ErrorMessage name="topic.name" className="text-danger" component="p"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Nội dung đề tài(<span
                                                className="text-danger">*</span>)</label>
                                            <Field name="topic.introduce" as='textarea' className="form-control"
                                                   placeholder="Nội dung đề tài"></Field>
                                            <ErrorMessage name="topic.introduce" className="text-danger" component="p"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Mô tả(<span
                                                className="text-danger">*</span>)</label>
                                            <input placeholder="MoTa" name="topic.content"
                                                   className="form-control" type="file"
                                                   onChange={onMotaChange}
                                            />
                                            <ErrorMessage name="topic.content" className="text-danger" component="p"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formImg" className="form-label">Hình ảnh(<span
                                                className="text-danger">*</span>)</label>
                                            <input placeholder="HinhAnh" name="topic.image"
                                                   className="form-control" type="file"
                                                   onChange={onAvatarChange}
                                            />
                                            <ErrorMessage name="topic.image" className="text-danger" component="p"/>

                                        </div>
                                        <div className="mb-3" style={{textAlign: "center"}}>
                                            <button className="btn btn-outline-success" type="submit">Đăng ký đề tài
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-8 col-right col-rightTan ">
                                <div>
                                    <h5 className="h5Tan">Danh sách đề tài</h5>
                                    <table className="table">
                                        <thead>
                                        <tr className="table-heading table-headingTan">
                                            <th>STT</th>
                                            <th>Tên đề tài</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Phần mềm quản lý nước sạch</td>
                                            <td>
                                                <button className="btn btn-outline-success ">Chi tiết</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Phần mềm quản lý thuốc</td>
                                            <td>
                                                <button className="btn btn-outline-success ">Chi tiết</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Phần mềm quản lý chi tiêu</td>
                                            <td>
                                                <button className="btn btn-outline-success ">Chi tiết</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Phần mềm hỗ trợ bán hàng</td>
                                            <td>
                                                <button className="btn btn-outline-success ">Chi tiết</button>
                                            </td>
                                        </tr>
                                        </tbody>

                                    </table>
                                    <br/>
                                    <div className="row">
                                        <div className="col-5"></div>
                                        <div className="col-7 pagination-containerTan">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">&laquo;</span>
                                                            <span className="sr-only"></span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item"><a className="page-link" href="#">1/4</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">&raquo;</span>
                                                            <span className="sr-only"></span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossOrigin="anonymous"></script>
                    </div>
                </div>
            </>
        </Formik>

    </>)
}
