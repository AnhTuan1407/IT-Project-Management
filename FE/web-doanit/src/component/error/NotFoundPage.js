import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';
const NotFoundPage = () => {
    return (
        <div className="not-found-page" style={{marginTop:"60px"}}>
            <h1>404 - Trang không tìm thấy</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
};

export default NotFoundPage;
