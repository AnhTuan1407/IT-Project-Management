import {Formik, Form, Field, useFormik, ErrorMessage} from 'formik'
import * as approvalTopicService from '../../service/ApprovalTopicService';
import {useParams} from "react-router";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from "react-toastify"
import '../approvalTopic/ListTopicNotApproval.css'
import {storage} from "../../config/firebaseConfig";
import * as Yup from 'yup'
import {useEffect, useState} from "react";
import {Modal, Button} from 'react-bootstrap';
import {TailSpin as Loader} from 'react-loader-spinner';

function ListTopicNotApproval(props) {
    const [topics, setTopics] = useState([])
    const {id} = useParams()
    const [infoTopicsCancel, setInfoTopicsCancel] = useState([])
    const [infoTopicRegisterCancel, setInfoTopicRegisterCancel] = useState([])
    const [infoTopicsApproval, setInfoTopicsApproval] = useState([])
    const [infoTopicRegisterApproval, setInfoTopicRegisterApproval] = useState([])
    const [topicRegister, setTopicRegister] = useState([])
    const [studentList, setStudentList] = useState([])
    const [errorData, setErrorData] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    // const [infoTopicById, setInforTopicById] = useState({});
    const [infoTopicById, setInforTopicById] = useState({
        infoTopicRegisterId: null,
        topicName: '',
        studentNames: [],
        topicImage: '',
        groupName: '',
        topicContent: ''
    });
    const [showModal, setShowModal] = useState(false);

    // Add these states to your component
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1); // Adjust the page size according to your backend
    const [totalPages, setTotalPages] = useState(1);

    const [documentUrls, setDocumentUrls] = useState([]);

    useEffect(() => {
        document.title = "Kiểm duyệt đề tài";
    }, []);

    //Validation approval form
    const validationSchema = Yup.object().shape({
        topicProcessList: Yup.array().of(
            Yup.object().shape({
                dateStart: Yup.string()
                    .required('Ngày bắt đầu là bắt buộc')
                    .test('isValidDateStart', 'Ngày bắt đầu phải lớn hơn ngày kết thúc của giai đoạn trước đó', function (value) {
                        const {dateEnd} = this.parent;
                        const currentProcessNumber = this.parent.processNumber;

                        if (this.parent.parent && this.parent.parent.topicProcessList) {
                            const previousProcess = this.parent.parent.topicProcessList.find(process => process.processNumber === currentProcessNumber - 1);

                            if (previousProcess && value && previousProcess.dateEnd) {
                                return new Date(value) < new Date(previousProcess.dateEnd);
                            }
                        }

                        return true;
                    }),
                dateEnd: Yup.string()
                    .required('Ngày kết thúc là bắt buộc')
                    .test('isValidDateEnd', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', function (value) {
                        const {dateStart} = this.parent;

                        if (value && dateStart) {
                            return new Date(value) > new Date(dateStart);
                        }

                        return true;
                    }),
            })
        ),
    });


    // Call API
    useEffect(() => {
        const fetchApi = async () => {
            const result = await approvalTopicService.getAllTopicNotApproval(currentPage);
            console.log(result);
            if (result) {
                setTopics(result.content);
                setTotalPages(result.totalPages);
            } else {
                setTopics([]);
                setTotalPages(1);
            }
        };
        fetchApi();
    }, [currentPage]);

    //Get document form firebase
    const fetchDocuments = async () => {
        try {
            const documentUrls = await Promise.all(topics.map(async (s) => {
                if (s.descriptionURL) {
                    const downloadUrl = await storage.ref(s.descriptionURL).getDownloadURL();
                    return downloadUrl;
                } else {
                    return null;
                }
            }));
            setDocumentUrls(documentUrls);
        } catch (error) {
            console.error("Error fetching documents from Firebase:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [topics]);

    //Get image topic from firebase
    const getImageFromFirebase = async (imageName) => {
        if (!imageName) return null;
        try {
            const downloadUrl = await storage.ref(imageName).getDownloadURL();
            return downloadUrl;
        } catch (error) {
            console.error("Error fetching image from Firebase:", error);
            throw error;
        }
    };

    const getInforTopic = async (id) => {
        try {
            const result = await approvalTopicService.findByIdTopic(id);
            console.log(result);
            if (result.topicImage) {
                const imageUrl = await getImageFromFirebase(result.topicImage);
                setImageUrl(imageUrl);
            }
            setInforTopicById(result || []);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast(error.response.data);
            } else {
                toast("Có lỗi xảy ra ");
            }
        }
    }

    //Show modal detail topic
    const handleShow = async (id) => {
        await getInforTopic(id);
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleApproval = async (item) => {
        console.log(item);
        let arrTopic = [item.topic.name, item.topic.content, item.topic.topicId]
        let arrInfoTopic = [item.infoTopicRegisterId, item.descriptionUrl, item.status, item.statusComplete, item.topicCancel, item.groupAccount.groupAccountId, item.teacher.teacherId]
        let arrStudent = Array.isArray(item.groupAccount.studentList) ? [...item.groupAccount.studentList] : [];

        setTopicRegister(item)
        setInfoTopicsApproval((prevState) => ({...prevState, ...arrTopic}));
        setInfoTopicRegisterApproval((prevState) => ({...prevState, ...arrInfoTopic}));
        setStudentList((prevState) => ([...prevState, ...arrStudent]));
        displayApprovalForm()
    }

    const handleCancel = async (item) => {
        console.log(item);
        let arrTopic = [item.topic.name, item.topic.content, item.topic.topicId]
        let arrInfoTopic = [item.infoTopicRegisterId, item.status, item.topicCancel]
        let arrStudent = Array.isArray(item.groupAccount.studentList) ? [...item.groupAccount.studentList] : [];
        console.log(arrStudent);
        const setInfo = async () => {
            setInfoTopicsCancel((prevState) => ({...prevState, ...arrTopic}));
            setInfoTopicRegisterCancel((prevState) => ({...prevState, ...arrInfoTopic}));
            setStudentList((prevState) => ([...prevState, ...arrStudent]));
        }
        await setInfo()

        displayCancelForm()
    }

    const displayCancelForm = () => {
        var formsApproval = document.getElementsByClassName("approval-form");
        for (var i = 0; i < formsApproval.length; i++) {
            formsApproval[i].style.display = "none";
        }
        var formsCancel = document.getElementsByClassName("cancel-form");
        for (var i = 0; i < formsCancel.length; i++) {
            formsCancel[i].style.display = "none";
        }
        // Hiển thị form cho id tương ứng
        var cancelForm = document.getElementById("cancelForm");
        cancelForm.style.display = "block";
    }

    const displayApprovalForm = () => {
        var formsApproval = document.getElementsByClassName("approval-form");
        for (var i = 0; i < formsApproval.length; i++) {
            formsApproval[i].style.display = "none";
        }
        var formsCancel = document.getElementsByClassName("cancel-form");
        for (var i = 0; i < formsCancel.length; i++) {
            formsCancel[i].style.display = "none";
        }
        // Hiển thị form cho id tương ứng
        var approvalForm = document.getElementById("approvalForm");
        approvalForm.style.display = "block";
    }

    const turnOffFormApproval = () => {
        var approvalForm = document.getElementById("approvalForm");
        approvalForm.style.display = "none";
    }

    const turnOffFormCancel = () => {
        var cancelForm = document.getElementById("cancelForm");
        cancelForm.style.display = "none";
    }

    return topics.length !== 0 ? (
        <div className="TuanHA">
            <div className="header-approval">
                <h2 className="title-approval">KIỂM DUYỆT ĐỀ TÀI</h2>
            </div>

            <div className='container'>
                <div className="content">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <table className="form-table">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên nhóm</th>
                                    <th>Tên đề tài</th>
                                    <th>Mô tả</th>
                                    <th style={{width: "100px"}}>Chi tiết</th>
                                    <th>Duyệt đề tài</th>
                                    <th>Hủy đề tài</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    topics.map((item, index) => (
                                        <tr key={item.infoTopicRegisterId}>
                                            <td>{index + 1}</td>
                                            <td>{item.groupAccount.name}</td>
                                            <td>{item.topic.name}</td>
                                            <td className='text-center'>
                                                {documentUrls[index] && (
                                                    <a href={documentUrls[index]} target="_blank"
                                                       rel="noopener noreferrer" type='button'
                                                       className="btn-document btn btn-secondary"
                                                       style={{borderRadius: "50%"}}>
                                                        <i className="bi bi-file-earmark-bar-graph"></i>
                                                    </a>
                                                )}
                                            </td>

                                            <td>
                                                <button type="button" className="btn btn-outline-success"
                                                        onClick={() => handleShow(item.infoTopicRegisterId)}>
                                                    Chi tiết
                                                </button>
                                            </td>

                                            <td className="text-center">
                                                <button className="btn btn-outline-success"
                                                        onClick={(e) => handleApproval(item)}>Duyệt
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-outline-danger"
                                                        onClick={(e) => handleCancel(item)}>Hủy
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>

                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Trước
                                </button>
                                <span>{currentPage}</span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Sau
                                </button>
                            </div>

                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>


            <div id="cancelForm" style={{padding: '20px', maxWidth: '600px', margin: 'auto'}} className="cancel-form">

                <Formik
                    initialValues={{
                        infoTopicRegisterId: infoTopicRegisterCancel[0],
                        status: 0,
                        topicCancel: 0,
                        topicId: infoTopicsCancel[2],
                        studentList: Array.isArray(studentList) ? [...studentList] : [],
                        messageCancel: ''
                    }}
                    enableReinitialize

                    validationSchema={Yup.object({
                        messageCancel: Yup.string().required('Yêu cầu nhập nguyên nhân hủy đề tài!')
                    })}

                    onSubmit={(values) => {
                        const cancel = async () => {
                            approvalTopicService.cancelTopic(values);
                            setTopics(prevTopics => prevTopics.filter(topic => topic.infoTopicRegisterId !== values.infoTopicRegisterId));
                            document.getElementById("cancelForm").style.display = "none";
                            toast('🦄 Hủy thành công!!!!');
                        };
                        console.log(values);
                        try {
                            cancel();
                        } catch (e) {
                            toast('Có lỗi xảy ra!');
                        }


                    }}
                >
                    <div style={{marginTop: '20px'}}>
                        <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '20px'}}>
                            <div className="row">
                                <div className="col-sm">
                                    <h2 style={{color: '#dc3545', fontWeight: 'bold', marginBottom: '20px'}}>Hủy đề
                                        tài</h2>
                                    <label style={{fontWeight: 'bold', fontSize: '16px', color: "black"}}>Đề
                                        tài: {infoTopicsCancel[0]}</label>
                                    <br/>
                                    <label style={{fontWeight: 'bold', fontSize: '14px', color: '#555'}}>Mô
                                        tả: {infoTopicsCancel[1]}</label>
                                </div>
                                <div className="col-sm">
                                    <Form>
                                        <div className="form-group">
                                            <div className="col-sm">
                                                <label htmlFor="contentTopic"
                                                       style={{fontWeight: 'bold', fontSize: '14px', color: "red"}}>Nội
                                                    dung nguyên
                                                    nhân hủy.</label>
                                                <Field
                                                    className="form-control"
                                                    as="textarea"
                                                    id="contentTopic"
                                                    name="messageCancel"
                                                    style={{minHeight: '100px', resize: 'vertical', marginTop: '8px'}}
                                                ></Field>
                                                <ErrorMessage name='messageCancel' component="div"
                                                              className="text-danger"/>
                                            </div>
                                        </div>

                                        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '15px'}}>
                                            <button
                                                className="btn btn-secondary mx-2"
                                                type="button"
                                                onClick={turnOffFormCancel}
                                                style={{fontSize: '14px'}}
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                type="submit"
                                                style={{fontSize: '14px'}}
                                            >
                                                Gửi
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Formik>
            </div>


            <div id='approvalForm' style={{padding: '20px', backgroundColor: '#f8f9fa'}} className='approval-form'>

                <Formik
                    initialValues={{
                        infoTopicRegisterId: infoTopicRegisterApproval[0],
                        topicId: infoTopicsApproval[2],
                        topicProcessList: [
                            {
                                dateStart: '',
                                dateEnd: '',
                                status: 0,
                                processNumber: 1,
                                percentProcess: 0,
                                infoTopicRegister: infoTopicRegisterApproval[0]
                            },
                            {
                                dateStart: '',
                                dateEnd: '',
                                status: 0,
                                processNumber: 2,
                                percentProcess: 0,
                                infoTopicRegister: infoTopicRegisterApproval[0]
                            },
                            {
                                dateStart: '',
                                dateEnd: '',
                                status: 0,
                                processNumber: 3,
                                percentProcess: 0,
                                infoTopicRegister: infoTopicRegisterApproval[0]
                            }
                        ],
                        studentList: Array.isArray(studentList) ? [...studentList] : [],
                    }}
                    enableReinitialize

                    validationSchema={validationSchema}

                    onSubmit={async (values, {setSubmitting}) => {
                        try {
                            setSubmitting(true);

                            const response = await approvalTopicService.createProcess(values);

                            if (response != null) {
                                setErrorData(response);
                            } else {
                                setErrorData({});
                                setTopics((prevTopics) => prevTopics.filter((topic) => topic.infoTopicRegisterId !== values.infoTopicRegisterId));
                                document.getElementById('approvalForm').style.display = 'none';
                                toast('🦄 Duyệt thành công!!!!');
                            }
                        } catch (e) {
                            toast('Có lỗi xảy ra!');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <div>
                            <div className="card"
                                 style={{maxWidth: '800px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                                <div className="row">
                                    <div className="col-sm" style={{padding: '20px'}}>

                                        <Form>
                                            <div>
                                                <div>

                                                    <div className="row g-2" data-date-format="dd-mm-yyyy">
                                                        <h5 style={{
                                                            fontWeight: 'bold',
                                                            marginBottom: '20px',
                                                            borderBottom: '2px solid #007bff',
                                                            paddingBottom: '10px'
                                                        }}>Giai đoạn 1: PLAN</h5>

                                                        <div className="col-sm">
                                                            <label htmlFor="start" style={{fontWeight: 'bold'}}>Ngày bắt
                                                                đầu</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[0].dateStart" id="start"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[0].dateStart'
                                                                          component="div" className="text-danger"/>
                                                            {errorData['topicProcessList[0].dateStart'] && <div
                                                                className="text-danger">{errorData['topicProcessList[0].dateStart']}</div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <label htmlFor="end" style={{fontWeight: 'bold'}}>Ngày kết
                                                                thúc</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[0].dateEnd" id="end"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[0].dateEnd'
                                                                          component="div"
                                                                          className="text-danger"/>
                                                        </div>
                                                        <hr style={{margin: '20px 0'}}/>
                                                    </div>

                                                    <div className="row g-2" data-date-format="dd-mm-yyyy">
                                                        <h5 style={{
                                                            fontWeight: 'bold',
                                                            marginBottom: '20px',
                                                            borderBottom: '2px solid #007bff',
                                                            paddingBottom: '10px'
                                                        }}>Giai đoạn 2: CODING</h5>

                                                        <div className="col-sm">
                                                            <label htmlFor="start" style={{fontWeight: 'bold'}}>Ngày bắt
                                                                đầu</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[1].dateStart" id="start"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[1].dateStart'
                                                                          component="div" className="text-danger"/>
                                                            <ErrorMessage name='isValidDateStart' component="div"
                                                                          className="text-danger"/>
                                                            {errorData['topicProcessList[1].dateStart'] && <div
                                                                className="text-danger">{errorData['topicProcessList[1].dateStart']}</div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <label htmlFor="end" style={{fontWeight: 'bold'}}>Ngày kết
                                                                thúc</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[1].dateEnd" id="end"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[1].dateEnd'
                                                                          component="div"
                                                                          className="text-danger"/>
                                                        </div>
                                                        <hr style={{margin: '20px 0'}}/>
                                                    </div>

                                                    <div className="row g-2" data-date-format="dd-mm-yyyy">
                                                        <h5 style={{
                                                            fontWeight: 'bold',
                                                            marginBottom: '20px',
                                                            borderBottom: '2px solid #007bff',
                                                            paddingBottom: '10px'
                                                        }}>Giai đoạn 3: TESTING</h5>

                                                        <div className="col-sm">
                                                            <label htmlFor="start" style={{fontWeight: 'bold'}}>Ngày bắt
                                                                đầu</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[2].dateStart" id="start"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[2].dateStart'
                                                                          component="div" className="text-danger"/>
                                                            {errorData['topicProcessList[2].dateStart'] && <div
                                                                className="text-danger">{errorData['topicProcessList[2].dateStart']}</div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <label htmlFor="end" style={{fontWeight: 'bold'}}>Ngày kết
                                                                thúc</label>
                                                            <Field className="form-control"
                                                                   name="topicProcessList[2].dateEnd" id="end"
                                                                   type="date"/>
                                                            <ErrorMessage name='topicProcessList[2].dateEnd'
                                                                          component="div"
                                                                          className="text-danger"/>
                                                        </div>
                                                        <hr style={{margin: '20px 0'}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {isSubmitting ? (
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '50px'
                                                }}>
                                                    <Loader type='TailSpin' color='grey' height={50} width={50}/>
                                                </div>
                                            ) : (
                                                <div className='d-grid gap-2'>
                                                    <button type='submit' className='btn btn-success'>
                                                        Duyệt
                                                    </button>
                                                    <button className='btn btn-outline-info'
                                                            onClick={turnOffFormApproval}>
                                                        Hủy
                                                    </button>
                                                </div>
                                            )}
                                        </Form>


                                    </div>
                                    <div className="col-sm"
                                         style={{backgroundColor: '#c7f1ae', color: 'black', padding: '20px'}}>
                                        <div>
                                            <h4 style={{fontWeight: 'bold', marginBottom: '20px', color: "black"}}>Thông
                                                tin
                                                đề tài</h4>
                                            <p style={{fontWeight: 'bold', marginBottom: '5px'}}>Đề tài:</p>
                                            <p>{infoTopicsApproval[0]}</p>
                                            <p style={{fontWeight: 'bold', marginBottom: '5px'}}>Mô tả:</p>
                                            <p>{infoTopicsApproval[1]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>

            <Modal show={showModal} onHide={handleClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "Green"}}>THÔNG TIN CHI TIẾT ĐỀ TÀI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-3 mr-2">
                            <div className="avatar-container">
                                <img
                                    className="topicImage"
                                    alt="Loading...."
                                    src={imageUrl}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mr-5">
                            <div className="form-group">
                                <label htmlFor="groupName" style={{color: "black", fontWeight: "bold"}}>Tên nhóm</label>
                                <p style={{color: "black"}}>{infoTopicById.groupName}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentNames" style={{color: "black", fontWeight: "bold"}}>Tên sinh
                                    viên</label>
                                <p style={{color: "black"}}>{infoTopicById.studentNames}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="topicName" style={{color: "black", fontWeight: "bold"}}>Tên đề
                                    tài</label>
                                <p style={{color: "black"}}>{infoTopicById.topicName}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="topicContent" style={{color: "black", fontWeight: "bold"}}>Nội dung đề
                                    tài</label>
                                <p style={{color: "black"}}>{infoTopicById.topicContent}</p>
                            </div>

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    ) : "Tất cả đề tài đã đươc phê duyệt!"
}

export default ListTopicNotApproval
