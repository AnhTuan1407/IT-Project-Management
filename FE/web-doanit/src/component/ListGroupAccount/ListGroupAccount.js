import React, {useState, useEffect} from 'react';
import * as GroupService from '../../../src/service/GroupAccountService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './css.css'


import {PaginationNav} from "./PaginationNav";
import {toast} from "react-toastify";
const ListGroupAccount = () => {
    const [groups, setGroup] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [searchKeyTmp, setSearchKeyTmp] = useState("");
    const [showAccept, setShowAccept] = useState(false);
    const [groupAcceptId,setGroupAcceptId]=useState("");
    const [groupDeleteId,setGroupDeleteId]=useState("");
    const [listStudentDeleteGroup,setListStudentDeleteGroup]=useState("");
    const [showDelete,setShowDelete]=useState(false);
    const [showCreateDeadline,setShowCreateDeadline]=useState(false);
    const [groupCreateDayId,setGroupCreateDayId]=useState("");
    const [deadline,setDeadline]=useState("");
    const [isValidDeadline, setIsValidDeadline] = useState(false);
    const [deadlineError, setDeadlineError] = useState("");
    const [nameGroup,setNameGroup]=useState("");
    const [renderList,setRenderList]=useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deletingGroupId, setDeletingGroupId] = useState(null);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [acceptingGroupId, setAcceptingGroupId] = useState(null);
    const handleCloseAccept = () => setShowAccept(false);
    const handleShowAccept = (id,name) => {
        setGroupAcceptId(id)
        setNameGroup(name);
        setAcceptingGroupId(id);
        setShowAccept(true)};
    const handleCloseDelete=()=>setShowDelete(false);

    const handleShowDelete=(id,students,name)=>{
        setGroupDeleteId(id)
        setListStudentDeleteGroup(students)
        setNameGroup(name)
        setDeletingGroupId(id);
        setShowDelete(true);};

    const handleShowCreateDeadline=(id,name)=>{
        setGroupCreateDayId(id)
        setNameGroup(name)
        setShowCreateDeadline(true)
    };


    const handleCloseCreateDeadline=()=>
    {setShowCreateDeadline(false);}

    const handleDeadlineChange = (e) => {
        setIsValidDeadline(false)
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        // Kiểm tra nếu ngày nhập vào lớn hơn ngày hiện tại
        const isValid = (selectedDate > currentDate);
        if (isValid) {
            setDeadline(e.target.value);
            setDeadlineError("");
        } else {
            setDeadlineError("Ngày phải lớn hơn ngày hiện tại");
        }
        setIsValidDeadline(isValid);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await GroupService.findAll(pageNumber, searchKey)
                setGroup(data.content);
                setTotalPages(data.totalPages);
                console.log("Data after fetch:", data.content);
                console.log("render")
                console.log(renderList)

            } catch (error) {
                console.error('Error fetching data:', error);
                setGroup([]);
                setTotalPages(0);
            }
        };
        fetchApi()
    }, [pageNumber,searchKey,renderList]) // Thực hiện một lần sau khi component được render


    const handleSearch = () => {
        setSearchKey(searchKeyTmp);
    };

    const handleAcceptGroup=async (id)=>{
        setAcceptingGroupId(id)
        setLoadingAccept(true);
        toast('🦄 Đang duyệt...');
        handleCloseAccept()
        try {
            await GroupService.acceptGroup(id)
            setRenderList((prevRenderList) => !prevRenderList);
        } catch (e){
            console.log(e);
        } finally {
            setLoadingAccept(false);
            toast('🦄 Duyệt nhóm thành công!!!!');
            setAcceptingGroupId(null);
        }
    }
    const handleDeleteGroup=async (id,listStudent)=>{
        setDeletingGroupId(id);
        setLoadingDelete(true);
        toast('🦄 Đang xóa...');
        handleCloseDelete()
        try {
            await GroupService.deleteGroup(id,listStudent)
            setRenderList((prevRenderList) => !prevRenderList);
        } catch (e){
            console.log(e);
        }  finally {
            setLoadingDelete(false);
            toast('🦄 Xóa nhom thành công!!!!');
            setDeletingGroupId(null);
        }
    }

    const handleCreateDeadLine=async (id,deadline)=>{
        try {
            await GroupService.createDeadLine(id,deadline)
            console.log(deadline)
            setIsValidDeadline(false);
        } catch (e){
            console.log(e);
        }
        toast('🦄 Tạo hạn nộp thành công!!!!');
        handleCloseCreateDeadline()
        setRenderList((prevRenderList) => !prevRenderList);
    }

    return (
        <>
            <div className="modal fade" id="mymodal">
                <Modal show={showAccept} onHide={handleCloseAccept}  className='modalAcceptNghia'>
                    <Modal.Header closeButton className='ModalAcceptHeaderNghia'>
                        <Modal.Title>Xác nhận duyệt nhóm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có thực sự muốn duyệt nhóm {nameGroup} không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAccept}>
                            Đóng
                        </Button>
                        <Button variant="btn btn-success"  onClick={e=>handleAcceptGroup(groupAcceptId)}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="modal fade" id="mymodal2">
                <Modal show={showDelete} onHide={handleCloseDelete}  className='ModalDeleteNghia'>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa nhóm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có thực sự muốn xóa nhóm {nameGroup} không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Đóng
                        </Button>
                        <Button variant="btn btn-success"  onClick={event=>handleDeleteGroup(groupDeleteId,listStudentDeleteGroup)}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='modal3'>
                <Modal show={showCreateDeadline} onHide={handleCloseCreateDeadline} className='ModalCreateDeadlineNghia'>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo hạn chót nộp dự án</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Hãy nhập hạn chót nộp dự án của nhóm {nameGroup}:</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    onChange={handleDeadlineChange}

                                    autoFocus
                                />

                                <Form.Control.Feedback type="invalid">
                                    {isValidDeadline ? "" : "Ngày phải lớn hơn ngày hiện tại"}
                                </Form.Control.Feedback>
                                <p className="text-danger">{deadlineError}</p>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateDeadline}>
                            Đóng
                        </Button>
                        <Button variant="btn btn-success"
                                onClick={() => isValidDeadline && handleCreateDeadLine(groupCreateDayId, deadline)}
                                disabled={!isValidDeadline}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="customCSS" style={{marginTop:"80px"}}>
            <head>
                <title>Quản lý đồ án</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                      crossOrigin="anonymous"></link>
                <link rel="stylesheet"
                      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></link>
            </head>
            <body>
            <div className="header">
            </div>
            <div className="container containerNghia">
                <div className="col-12">
                    <div className="title1 title1Nghia"><h2>QUẢN LÝ NHÓM SINH VIÊN</h2></div>
                    <div className="d-flex justify-content-end justify-content-endNghia">
                        <div className="col-4">
                            <div className="input-group mb-3 rounded-pill border p-2">
                                <input type="text" className="form-control border-0"
                                       placeholder="Tìm kiếm bằng tên nhóm "
                                       aria-label="Tìm kiếm" aria-describedby="button-addon2"
                                       value={searchKeyTmp}
                                       onChange={(e) => setSearchKeyTmp(e.target.value)}
                                       maxLength={30}
                                />
                                <button className="btn btn-outline-secondary border-0  btn-hover-none rounded-circle"
                                        type="button" id="button-addon2"
                                        onClick={handleSearch}
                                ><div>
                                    <i className="bi bi-search-heart"></i></div></button>
                            </div>
                        </div>
                    </div>
                    <div className="tabledata">

                        <table className='tableNghia'>
                            <thead className='theadNghia'>
                            <tr>
                                <th scope="col" className='thNghia'>STT</th>
                                <th scope="col" className='thNghia'>Tên nhóm</th>
                                <th scope="col" className='thNghia'>Số sinh viên</th>
                                <th scope="col" className='thNghia'>Thời hạn chót nộp đề tài</th>
                                <th scope="col" className='thNghia'>Kiểm duyệt</th>
                                <th scope="col" colSpan="2" className='thNghia'>Chức năng</th>
                                <th scope="col" className='thNghia'>Gửi yêu cầu</th>
                            </tr>
                            </thead>
                            <tbody>
                            {groups.length === 0 ?
                                <tr>
                                    <th scope="col" colSpan="8"><h1 className="text-center">Dữ liệu không tồn tại</h1></th>
                                </tr>
                                :
                                <>
                                    {groups.map((s,index)=>(
                                        <tr key={index}>
                                            <th scope="row" className='thNghia'>{index+1}</th>
                                            <td className='tdNghia'>{s.name}</td>
                                            <td className='tdNghia'>{s.studentList.length}</td>
                                            <td className='tdNghia'>{s.date}</td>
                                            <td className='tdNghia'>
                                                <button type="button" className="btn btn-outline-success"  disabled={(s.status===true)||(loadingAccept&&acceptingGroupId===s.groupAccountId)} onClick={event =>  handleShowAccept(s.groupAccountId,s.name)} >Duyệt
                                                </button>
                                            </td>
                                            <td className="btndelete no-border btndeleteNghia">
                                                <button type="button" className="btn btn-outline-danger" disabled={loadingDelete && deletingGroupId === s.groupAccountId} onClick={event =>  handleShowDelete(s.groupAccountId,s.studentList.map(student => student.studentId),s.name)}> Xóa
                                                </button>
                                            </td>
                                            <td className="btnmember no-border btnmemberNghia">
                                                <button type="button" className="btn btn-outline-info">Thành viên</button>
                                            </td>
                                            <td className='tdNghia'>
                                                <button type="button" className="btn btn-outline-secondary" onClick={event =>  handleShowCreateDeadline(s.groupAccountId,s.name)}>Hạn
                                                    chót nộp dự án
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </body>
            <div className="row" id="pagination">
                <PaginationNav pageNumber={pageNumber}
                               totalPages={totalPages}
                               setPageNumber={setPageNumber}
                />
            </div>
            </div>

        </>
    );
};

export default ListGroupAccount;


