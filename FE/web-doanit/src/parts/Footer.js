import React, {useEffect} from 'react';
import ScrollReveal from "scrollreveal";
import '../pages/homepage.css'

const Footer = () => {

    return (
        <>
            <footer className="footer section">
                <div className="footer">
                    <div className="khang-container">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Liên hệ</h4>
                                <p><i className="bi bi-geo-alt"></i> Địa chỉ: 123 Đường Nguyễn Tri Phương, Thành phố Đà Nẵng
                                </p>
                                <p><i className="bi bi-telephone"></i> Điện thoại: (123) 456-7890</p>
                                <p><i className="bi bi-envelope"></i> Email: khangvan@example.com</p>
                            </div>
                            <div className="col-md-4">
                                <h4>Liên kết nhanh</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#"><i className="bi bi-dot"></i> Trang chủ</a></li>
                                    <li><a href="#"><i className="bi bi-dot"></i> Tin tức</a></li>
                                    <li><a href="#"><i className="bi bi-dot"></i> Sinh viên</a></li>
                                    <li><a href="#"><i className="bi bi-dot"></i> Liên hệ</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h4>Theo dõi chúng tôi</h4>
                                <div className="social-icons">
                                    <a href="#" className="btn btn-link"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="btn btn-link"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="btn btn-link"><i className="bi bi-linkedin"></i></a>
                                    <a href="#" className="btn btn-link"><i className="bi bi-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );
};

export default Footer;