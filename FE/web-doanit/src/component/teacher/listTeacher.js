import './listTeacher.css'
import {NavLink} from "react-router-dom";
import {storage} from "../../config/firebaseConfig";
import {PaginationNav} from "../student/PaginationNav";
import React, {useEffect, useState} from "react";
import * as TeacherService from "../../service/TeacherService";
import {toast} from "react-toastify";
import {LazyLoadImage} from "react-lazy-load-image-component";
import DeleteConfirmation from "./DeleteConfirmation";

export const ListTeacher = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [find, setFind] = useState("");

    const [searchValue, setSearchValue] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [avatarUrls, setAvatarUrls] = useState([]);
    const [delId, setDelId] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);

    const fetchApi = async () => {
        try {
            const result = await TeacherService.getAllTeacher(find, pageNumber);
            result.avatar = fetchAvatar();
            setTeachers(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
            setTeachers([])
            setTotalPages(0);
        }
    };
    useEffect(() => {
        fetchApi()
        fetchAvatar()
    }, [find, pageNumber])

    const fetchAvatar = async () => {
        try {
            const avatarUrls = await Promise.all(teachers.map(async (t) => {
                if (t.avatar) {
                    const downloadUrl = await storage.ref(t.avatar).getDownloadURL();
                    console.log(downloadUrl)
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
        fetchAvatar();
    }, [teachers]);

    const showDeleteModal = (delId) => {
        setDelId(delId);
        setDeleteMessage(
            `Bạn chắc chắn xóa giảng viên : '${
                teachers.find((x) => x.teacherId === delId).teacherName
            }' không?`
        );
        setDisplayModal(true);
    }
    const hideConfirmationModal = () => {
        setDisplayModal(false);
    };

    const submitDelete = async (delId) => {
        await TeacherService.deleteTeacher(delId);
        toast.success(`Xóa giảng viên '${teachers.find((x) => x.teacherId === delId).teacherName}' thành công.`)
        setDisplayModal(false);
        await fetchApi(0, '');
    };
    const handleSearch = () => {
        setFind(searchValue);
    };


    return (

        <div className='container' style={{
            width: '100%',
            maxWidth: '1200px',
            paddingRight: 'var(--bs-gutter-x,.75rem)',
            paddingLeft: 'var(--bs-gutter-x,.75rem)',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: "80px"
        }}>

            <div
                className='row'>
                <div className='huy title'>
                    <p>Quản lý giáo viên</p>
                </div>
            </div>
            <div className='row'>
                <div className="huy d-flex justify-content-around" style={{marginTop: '25px', marginBottom: '12px'}}>
                    <NavLink to={"/create-teacher"} type="button" className="huy get-started-btn"
                             style={{border: '0', marginLeft: '-45px'}}>
                        Thêm mới giáo viên
                    </NavLink>
                    <div className="d-flex">
                        <input
                            className="form-control"
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Tìm kiếm giáo viên"
                            style={{borderRadius: '30px', border: '1px solid #d6c9bb', height: '37px', width: '350px'}}
                        />
                        <button type="button" className="huy get-started-btn"
                                style={{border: '0', marginLeft: '15px', marginRight: '-5px'}} onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: '20px'}}>
                {teachers.length === 0 ? <h1 className='huy text-center'>Không có dữ liệu</h1> : <>
                    {teachers.map((t, index) => (
                        <div className="col-3" key={t.teacherId}>
                            <div className="huy card card-huy">
                                <LazyLoadImage
                                    effect="blur" src={avatarUrls[index]} className="huy img"
                                    alt={`Giảng viên ${t.teacherId}`}
                                />
                                <hr/>
                                <div className='huy card-body-huy'>
                                    <h5 className="huy card-title">{t.teacherName}</h5>
                                    <p className="huy card-text"><b><i className="bi bi-code-square" style={{
                                        marginLeft: '10px',
                                        color: 'black'
                                    }}></i> Mã giảng viên
                                    </b>: {"MGV-".concat(t.teacherId.toString())}</p>
                                    <p className="huy card-text"><b><i className="bi bi-envelope-at" style={{
                                        marginLeft: '10px',
                                        color: 'black'
                                    }}></i> Email
                                    </b>: {t?.email.length > 20 ? `${t.email.slice(0, 18)} ...` : t.email}</p>
                                    <p className="huy card-text"><b><i className="bi bi-telephone" style={{
                                        marginLeft: '10px',
                                        color: 'black'
                                    }}></i> Sdt </b>: {t.phone}</p>
                                    <p className="huy card-text"><b><i className="bi bi-signpost-2" style={{
                                        marginLeft: '10px',
                                        color: 'black'
                                    }}></i> Khoa </b>: {t.facultyName}
                                    </p>
                                </div>
                                <hr/>
                                <div className="huy action" style={{float: 'right'}}>
                                    <NavLink to={`/update-teacher/${t.teacherId}`}>
                                        <button className="huy btn btn-lh btn-success bi bi-pencil-square"
                                                style={{marginRight: ' 8px'}}></button>
                                    </NavLink>

                                    <button className="huy btn btn-lh btn-danger bi bi-trash"
                                            onClick={() => showDeleteModal(t.teacherId)}></button>
                                </div>
                            </div>
                        </div>
                    ))
                    }

                </>
                }
            </div>

            <div className="row" style={{marginTop: '20px'}}>
                <div>
                    <PaginationNav pageNumber={pageNumber}
                                   totalPages={totalPages}
                                   setPageNumber={setPageNumber}/>
                </div>
            </div>


            <DeleteConfirmation showModal={displayModal} confirmModal={submitDelete}
                                hideModal={hideConfirmationModal} id={delId} message={deleteMessage}/>
        </div>

    )
}


