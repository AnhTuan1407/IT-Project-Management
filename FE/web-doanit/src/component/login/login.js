import './login.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as LoginService from "../../service/LoginService";
import logo from '../../assets/images/logo.png';
import {useLocation, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = location.state?.from?.pathname;

    const redirectToPrevious = () => {
        if (previousPath && previousPath !== "/") {
            navigate(previousPath);
        } else {
            navigate("/");
        }
    };
    return (
        <div className="login">
            <div className="body" style={{backgroundColor: "#cbecb7", fontFamily: "Helvetica"}}>
                <div className="container"
                     style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <div className="card shadow" style={{width: "85%", height: "auto"}}>
                        <div className="row" style={{margin: "0 auto"}}>
                            <div className="col-6">
                                <div className="item" style={{paddingTop: '30px', paddingRight: 0}}>
                                    <div className="avatar-container"
                                         style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <img src={logo} alt="Avatar" className="avatar"
                                             style={{marginTop: "0", width: "75%", height: "auto"}}/>
                                    </div>
                                    <div className="text-item" style={{paddingLeft: '20px'}}>
                                        <h3 style={{textAlign: "left"}}>ĐỒ ÁN<br/>
                                            <span>CÔNG NGHỆ THÔNG TIN</span></h3>
                                        <p style={{textAlign: "left"}}>Chào mừng bạn tới với trang web của chúng tôi
                                            !</p>
                                        <div className="social-icon">
                                            <a href="#"><i className='bx bxl-facebook'
                                                           style={{
                                                               color: "#100f0f",
                                                               fontSize: "24px",
                                                               marginLeft: "10px",
                                                               cursor: "pointer",
                                                               transition: ".5s ease",
                                                               marginBottom: "45px"
                                                           }}></i></a>
                                            <a href="#"><i className='bx bxl-twitter'
                                                           style={{
                                                               color: "#100f0f",
                                                               fontSize: "24px",
                                                               marginLeft: "10px",
                                                               cursor: "pointer",
                                                               transition: ".5s ease",
                                                               marginBottom: "45px"
                                                           }}></i></a>
                                            <a href="#"><i className='bx bxl-youtube'
                                                           style={{
                                                               color: "#100f0f",
                                                               fontSize: "24px",
                                                               marginLeft: "10px",
                                                               cursor: "pointer",
                                                               transition: ".5s ease",
                                                               marginBottom: "45px"
                                                           }}></i></a>
                                            <a href="#"><i className='bx bxl-instagram'
                                                           style={{
                                                               color: "#100f0f",
                                                               fontSize: "24px",
                                                               marginLeft: "10px",
                                                               cursor: "pointer",
                                                               transition: ".5s ease",
                                                               marginBottom: "45px"
                                                           }}></i></a>
                                            <a href="#"><i className='bx bxl-linkedin'
                                                           style={{
                                                               color: "#100f0f",
                                                               fontSize: "24px",
                                                               marginLeft: "10px",
                                                               cursor: "pointer",
                                                               transition: ".5s ease",
                                                               marginBottom: "45px"
                                                           }}></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="login-section">
                                    <div className="form-box login">
                                        <Formik
                                            initialValues={{
                                                userName: '',
                                                password: ''
                                                // rememberPassword:''
                                            }}
                                            validationSchema={Yup.object({
                                                userName: Yup.string().required("Vui lòng nhập tên nguời dùng")
                                                    .min(5, 'Tên người dùng không bé hơn 5 kí tự')
                                                    .max(20, 'Tên người dùng không lớn hơn 19 kí tự')
                                                    .matches(/^[a-zA-Z0-9_\-]+$/u, "Tên người dùng không chứa kí tự đặt biệt"),
                                                password: Yup.string().required("Vui lòng nhập mật khẩu")
                                                    .min(8, 'Mật khẩu không bé hơn 8 kí tự')
                                                ,
                                            })}
                                            onSubmit={async (values) => {
                                                try {
                                                    await LoginService.login(values);
                                                    toast.success("Đăng nhập thành công", {autoClose: 1500});
                                                    redirectToPrevious();
                                                } catch (error) {
                                                    const errorMessage = error.response && error.response.status === 401
                                                        ? error.response.data : "Có lỗi xảy ra khi đăng nhập";
                                                    toast.error(errorMessage, {autoClose: 1500});

                                                }
                                            }}>
                                            <div>
                                                <Form style={{marginTop: "90px"}}>
                                                    <h2 style={{
                                                        textAlign: "center",
                                                        fontSize: "25px"
                                                    }}>ĐĂNG NHẬP</h2>
                                                    <div className="input-box" style={{
                                                        width: "calc(100% - 28px)",
                                                        height: "45px",
                                                        borderBottom: "2px solid #100f0f",
                                                        margin: "40px 0",
                                                        position: "relative"
                                                    }}>
                                                        <span className="icon"
                                                              style={{
                                                                  position: "absolute",
                                                                  top: "13px",
                                                                  right: "0",
                                                                  fontSize: "19px"
                                                              }}><i className='bx bxs-paint'></i></span>
                                                        <Field style={{
                                                            width: "100%",
                                                            height: "45px",
                                                            background: "transparent",
                                                            border: "none",
                                                            outline: "none",
                                                            fontSize: "16px",
                                                            paddingRight: "28px"

                                                        }}
                                                               name="userName" type="text" id="username"/>
                                                        <label htmlFor="userName"
                                                               style={{
                                                                   position: "absolute",
                                                                   left: "0",
                                                                   transform: "translateY(-50%)", fontSize: "16px",
                                                                   pointerEvents: " none",
                                                                   transition: ".3s ease"
                                                               }}>Tên đăng nhập</label>
                                                        <span>
                                                            <br/>
                                                            <ErrorMessage name="userName" component="span"
                                                                          className="text-danger error-message"
                                                                          style={{
                                                                              color: "red",
                                                                              fontSize: "13px",
                                                                              float: "left"
                                                                          }}/>
                                                        </span>

                                                    </div>
                                                    <div className="input-box" style={{
                                                        width: "calc(100% - 28px)",
                                                        height: "45px",
                                                        borderBottom: "2px solid #100f0f",
                                                        margin: "40px 0",
                                                        position: "relative"
                                                    }}>
                                                        <span className="icon" style={{
                                                            position: "absolute",
                                                            top: "13px",
                                                            right: "0",
                                                            fontSize: "19px"
                                                        }}><i
                                                            className='bx bxs-lock-alt'></i></span>
                                                        <Field style={{
                                                            width: "100%",
                                                            height: "45px",
                                                            background: "transparent",
                                                            border: "none",
                                                            outline: "none",
                                                            fontSize: "16px",
                                                            paddingRight: "28px"
                                                        }} name="password" type="password" id="password"/>
                                                        <label
                                                            style={{
                                                                position: "absolute",
                                                                left: "0",
                                                                transform: "translateY(-50%)", fontSize: "16px",
                                                                pointerEvents: " none",
                                                                transition: ".3s ease"
                                                            }}
                                                            htmlFor="password">Mật khẩu</label>
                                                        <span>
                                                            <br/>
                                                            <ErrorMessage name="password" component="span"
                                                                          className="text-danger error-message"
                                                                          style={{
                                                                              color: "red",
                                                                              fontSize: "13px",
                                                                              float: "left"
                                                                          }}/>
                                                        </span>

                                                    </div>
                                                    <button type="submit" className="btn btn-outline-success"
                                                            style={{
                                                                width: "90%",
                                                                height: "45px",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                fontSize: "16px",
                                                                color: "#100f0f",
                                                                boxShadow: "rgba(0, 0, 0, 0.4)",
                                                                marginLeft: "0px"
                                                            }}
                                                    >Đăng nhập
                                                    </button>
                                                </Form>
                                            </div>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
