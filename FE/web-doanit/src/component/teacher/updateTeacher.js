import React, {useEffect, useState} from "react";
import {Field, Form, Formik, ErrorMessage, useFormikContext} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import * as TeacherService from "../../service/TeacherService";
import * as FacultyService from "../../service/FacultyService";
import * as DegreeService from "../../service/DegreeService";
import "./createUpdateTeacher.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {storage} from "../../config/firebaseConfig";
import {NavLink, useNavigate, useParams} from "react-router-dom";

export const UpdateTeacher = () => {
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [errorData, setErrorData] = useState({});
    const [teacher, setTeacher] = useState({
        name: "",
        address: "",
        email: "",
        teacherId: 1,
        gender: true,
        dateOfBirth: "",
        phone: "",
        degreeId: 1,
        avatar: "",
        facultyId: 1
    });

    const [isPhoneTouched, setIsPhoneTouched] = useState(true);
    const [isEmailTouched, setIsEmailTouched] = useState(true);
    const [isAgeTouched, setIsAgeTouched] = useState(true);
    const [isNameTouched, setIsNameTouched] = useState(true);
    const [isUploadImage, setIsUploadImage] = useState(true);
    const [isFileTouched, setIsFileTouched] = useState(true);

    const {id} = useParams();


    const handlePhoneTouched = () => {
        setIsPhoneTouched(false);
    };

    const handleEmailTouched = () => {
        setIsEmailTouched(false);
    };

    const handleAgeTouched = () => {
        setIsAgeTouched(false);
    };

    const handleNameTouched = () => {
        setIsNameTouched(false);
    };

    const handleFileTouched = () => {
        setIsFileTouched(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await TeacherService.getTeacherById(id);
                const facultyList = await FacultyService.findAllFaculty();
                const degreeList = await DegreeService.findAllDegree();
                setFaculties(facultyList);
                setDegrees(degreeList);
                setTeacher(result);
                if (result.avatar) {
                    const imageUrl = await getAvatarFromFirebase(result.avatar);
                    setAvatarUrl(imageUrl);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);


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


    const onAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setIsUploadImage(false);
            setAvatar(event.target.files[0]);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    };


    const handleAvatarUpload = async () => {
        if (avatar) {
            const uploadTask = storage.ref(`${avatar.name}`).put(avatar);
            uploadTask.on("state_changed", (snapshot) => {
                if (snapshot.state === "success") {
                    setAvatarUrl(snapshot.downloadURL);
                } else if (snapshot.state === "error") {
                    setErrorData({errorFileUpload: "Lỗi upload ảnh"});
                }
            });
        }

    };

    const initialValues = {
        name: teacher.name,
        dateOfBirth: teacher.dateOfBirth,
        address: teacher.address,
        phone: teacher.phone,
        email: teacher.email,
        facultyId: teacher.facultyId,
        degreeId: teacher.degreeId,
        gender: teacher.gender,
        teacherId: teacher.teacherId
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Tên bắt buộc nhập, không để trống")
            .min(5, 'Tên giáo viên không được bé hơn 5 kí tự')
            .max(50, 'Tên giáo viên không được lớn hơn 50 kí tự')
            .matches(/^[\p{L}\s]+$/u, "Tên giáo viên không được chứa ký tự đặc biệt ")
        ,
        dateOfBirth: Yup.string()
            .required("Ngày sinh bắt buộc nhập, không để trống")
            .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Vui lòng nhập ngày sinh đúng định dạng")
            .test('valid-age', '', function (value) {
                const now = new Date();
                const birthDate = new Date(value);
                const age = now.getFullYear() - birthDate.getFullYear();

                if (age < 18 || age > 50) {
                    return this.createError({
                        path: 'dateOfBirth',
                        message: 'Tuổi giáo viên phải từ 18 đến 50',
                    });
                }

                return true;
            }),
        address: Yup.string().required("Địa chỉ bắt buộc nhập, không để trống"),
        phone: Yup.string().required("Số điện thoại bắt buộc nhập, không để trống").matches("^[0-9]{10}$", "Vui lòng nhập số điện thoại đúng định dạng"),
        email: Yup.string().required("Email bắt buộc nhập buộc nhập, không để trống").email("Vui lòng nhập mail đúng định dạng   "),

    });

    const handleSubmit = async (values) => {
        setIsPhoneTouched(true);
        setIsNameTouched(true);
        setIsEmailTouched(true);
        setIsAgeTouched(true);
        setIsFileTouched(true);
        console.log(values);
        try {
            if (isUploadImage) {
                let name = avatarUrl.split('/');
                ;
                name = name[name.length - 1].split('?')[0];
                values.avatar = name;
            } else {
                await handleAvatarUpload();
                values.avatar = avatar.name;
            }
            const response = await TeacherService.updateTeacher(values);
            if (response !== null){
                setErrorData(response);
                toast("Sửa thông tin giáo viên thất bại");
            }else {
                setErrorData({});
                toast("Sửa thông tin giáo viên thành công" );
                navigate("/list-teacher")
            }
        } catch (error) {
            console.log(error.data);
        }
    };
    return teacher.name !== "" ? (
        <div className="container mx-auto" style={{marginTop:"60px"}}>
            <div className="row">
                <div className="col">
                    <h2 className="mt-3 mb-3" style={{textAlign:"center"}}>CHỈNH SỬA GIÁO VIÊN</h2>
                </div>

            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field name='teacherId' type="hidden" className="form-control" id="teacherId"/>
                        <div className="row">
                            <div className="col-4 d-flex flex-column">
                                <input
                                    id="avatar"
                                    type="file"
                                    className="form-control avatar"
                                    placeholder="Name"
                                    onChange={onAvatarChange}
                                    onFocus={handleFileTouched}
                                />
                                <img
                                    className="w-100"
                                    style={{marginTop:"18px"}}
                                    alt="avatar"
                                    src={avatarUrl || (avatar ? URL.createObjectURL(avatar) : 'default-avatar.png')}
                                />
                                {errorData.errorFileFormat && isFileTouched && (
                                    <div>
                                        <span  style={{color: "#dc3545"}}>{errorData.errorFileFormat}</span>
                                    </div>
                                )}
                                <label className="label-b label-form">Chọn ảnh đại diện(<span style={{color:"red"}}>*</span>):</label>
                                <label htmlFor="avatar" className="label-custom">Chọn tệp</label>

                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label htmlFor="name" className="label-input label-form">Tên Giáo Viên (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="name" type="text" className="form-control" placeholder="Name">
                                        {({field, form, meta}) => (
                                            <div>
                                                <input className="form-control" onFocus={handleNameTouched}
                                                       type="text" {...field} placeholder="Vd: Nguyễn Văn A"/>

                                            </div>
                                        )}
                                    </Field>
                                    <ErrorMessage name="name" component="span" className="text-danger span-custom"/>
                                    {errorData.errorNameSpecialCharacter && isNameTouched &&(
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorNameSpecialCharacter}</span>
                                        </div>
                                    )}


                                    {errorData.errorNameLength && isNameTouched &&(
                                        <div>
                                            <span className="span-custom"  style={{color: "#dc3545"}}>{errorData.errorNameLength}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBirth" className="label-input-a label-form">Ngày Sinh (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="dateOfBirth" type="date" className="form-control">
                                        {({field, form, meta}) => (
                                            <div>
                                                <input className="form-control" onFocus={handleAgeTouched}
                                                       type="date" {...field} />

                                            </div>
                                        )}
                                    </Field>
                                    <ErrorMessage name="dateOfBirth" component="span" className="text-danger span-custom"/>
                                    {errorData.errorDateMin && isAgeTouched &&(
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorDateMin}</span>
                                        </div>
                                    )}

                                    {errorData.errorDateMax && isAgeTouched &&(
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorDateMax}</span>
                                        </div>
                                    )}

                                    {errorData.errorDateEmpty && isAgeTouched &&(
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorDateEmpty}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="label-input-a label-form">Địa Chỉ (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="address" type="text" className="form-control" placeholder="Address" >
                                        {({field, form, meta}) => (
                                            <div>
                                                <textarea className="form-control" style={{height:"125px"}}
                                                          type="text" {...field} placeholder="Vd: 123 Trần Cao Vân, Thanh Khê, Đà Nẵng"/>

                                            </div>
                                        )}
                                    </Field>

                                    <ErrorMessage name="address" component="span" text className="text-danger span-custom"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="label-input-a label-form">Số Điện Thoại (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="phone" type="text" className="form-control" placeholder="Phone">
                                        {({field, form, meta}) => (
                                            <div>
                                                <input className="form-control" onFocus={handlePhoneTouched}
                                                       type="text" {...field} placeholder="Vd : 0987612634"/>

                                            </div>
                                        )}
                                    </Field>
                                    <ErrorMessage  name="phone" component="span" className="text-danger span-custom"/>
                                    {errorData.errorPhoneDuplicate && isPhoneTouched && (
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorPhoneDuplicate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-4 ">
                                <div className="form-group">
                                    <label htmlFor="email" className="label-input label-form">Email (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="email" type="email" className="form-control" placeholder="Email">
                                        {({field, form, meta}) => (
                                            <div>
                                                <input className="form-control" onFocus={handleEmailTouched}
                                                       type="text" {...field} placeholder="NguyenVanA@gmail.com"/>

                                            </div>
                                        )}
                                    </Field>

                                    <ErrorMessage name="email" component="span" className="text-danger span-custom"/>
                                    {errorData.errorEmailDuplicate && isEmailTouched && (
                                        <div>
                                            <span className="span-custom" style={{color: "#dc3545"}}>{errorData.errorEmailDuplicate}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="facultyId" className="label-input-a label-form">Faculty</label>
                                    <Field name="facultyId" as="select" className="form-control">
                                        {faculties.map((faculty) => (
                                            <option key={faculty.facultyId} value={faculty.facultyId}>
                                                {faculty.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="facultyId" component="span" className="text-danger span-custom"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="degreeId" className="label-input-a label-form">Học Vị (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="degreeId" as="select" className="form-control">
                                        {degrees.map((degree) => (
                                            <option key={degree.degreeId} value={degree.degreeId}>
                                                {degree.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="degreeId" component="span" className="text-danger span-custom"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender" className="label-input-a label-form">Giới Tính (<span style={{color:"red"}}>*</span>):</label>
                                    <Field name="gender" as="select" className="form-control">
                                        <option value={true}>Male</option>
                                        <option value={false}>Female</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="span" className="text-danger span-custom"/>
                                </div>
                                <div className="form-group d-flex justify-content-end">
                                    <button type="submit" className="btn btn-outline-success me-2  mt-2">
                                        Lưu
                                    </button>
                                    <NavLink to={"/list-teacher"} type="button" className="btn btn-outline-dark  mt-2">
                                        Hủy
                                    </NavLink>
                                </div>
                            </div>
                        </div>



                    </Form>
                )}
            </Formik>

        </div>
    ) : (
        <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            fontSize: '36px',
            color: '#87AA74',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',}}>
            <div>
                <div style={{ fontSize: '120px',
                    fontWeight: 'bold',
                    marginRight: '20px',}}>404</div>
                <h2>Không tìm thấy giáo viên</h2>
            </div>
        </div>
    );
};


export default UpdateTeacher;
