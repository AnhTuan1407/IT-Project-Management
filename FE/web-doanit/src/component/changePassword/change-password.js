import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as LoginService from "../../service/UserService";
import {toast} from "react-toastify";

export const ChangePasswordModal = ({showModal, setShowModal}) => {

    return (
        <div className="mt-3 save-exit-buttons">
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Đổi mật khẩu</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ĐỔI MẬT KHẨU</h5>
                            {/*<button type="reset" className="btn-close" data-bs-dismiss="modal"*/}
                            {/*        aria-label="Close"></button>*/}
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={Yup.object({
                                    oldPassword: Yup.string()
                                        .required("Vui lòng nhập mật khẩu cũ")
                                        .min(8, 'Mật khẩu không được bé hơn 8 kí tự')
                                        .max(20, 'Mật khẩu không được lớn hơn 20 kí tự'),
                                    newPassword: Yup.string()
                                        .required("Vui lòng nhập mật khẩu mới")
                                        .min(8, 'Mật khẩu mới không được bé hơn 8 kí tự')
                                        .max(20, 'Mật khẩu mới không được lớn hơn 20 kí tự'),
                                    confirmPassword: Yup.string()
                                        .required("Vui lòng nhập xác nhận mật khẩu ")
                                        .min(8, 'Xác nhận mật khẩu không được bé hơn 8 kí tự')
                                        .max(20, 'Xác nhận mật khẩu không được lớn hơn 20 kí tự')
                                        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu mới và xác nhận mật khẩu phải giống nhau')
                                })}
                                onSubmit={async (values,{resetForm}) => {
                                    try {
                                        const res = await LoginService.changePassword(values);
                                        toast.success(res);
                                        resetForm({values:''});
                                        setShowModal(false)
                                    } catch (error) {
                                        const errorMessage = error.response && error.response.status === 400
                                            ? error.response.data
                                            : "Có lỗi xảy ra khi đổi mật khẩu";
                                        toast.error(errorMessage, { autoClose: 1500 });
                                    }
                                }}
                            >
                                <div>
                                    <Form>
                                        <div className="form-group row">
                                            <label htmlFor="inputOldPassword"
                                                   className="col-sm-3 col-form-label" style={{color:"black", fontWeight:"bold"}}>Mật khẩu cũ
                                                <span className="required">*</span></label>
                                            <div className="col-sm-12">
                                                <Field name="oldPassword" type="password"
                                                       className="form-control"
                                                       id="inputOldPassword"
                                                       placeholder="Nhập mật khẩu cũ"/>
                                                <ErrorMessage name="oldPassword" component="span"
                                                              className="text-danger error-message"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputNewPassword"
                                                   className="col-sm-3 col-form-label" style={{color:"black", fontWeight:"bold"}}>Mật khẩu mới
                                                <span className="required">*</span>
                                            </label>
                                            <div className="col-sm-12">
                                                <Field name="newPassword" type="password" className="form-control"
                                                       id="inputNewPassword" placeholder="Nhập mật khẩu mới"/>
                                                <ErrorMessage name="newPassword" component="span"
                                                              className="text-danger error-message"/>

                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputConfirmPassword"
                                                   className="col-sm-3 col-form-label" style={{color:"black", fontWeight:"bold"}}>Xác nhận mật khẩu
                                                <span className="required">*</span>
                                            </label>
                                            <div className="col-sm-12">
                                                <Field name="confirmPassword" type="password" className="form-control"
                                                       id="inputConfirmPassword" placeholder="Xác nhận mật khẩu"/>
                                                <ErrorMessage name="confirmPassword" component="span"
                                                              className="text-danger error-message"/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="reset" className="btn btn-outline-secondary"
                                                    data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Thoát
                                            </button>
                                            <button type="submit" className="btn btn-outline-success">Lưu</button>
                                        </div>
                                    </Form>
                                </div>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
