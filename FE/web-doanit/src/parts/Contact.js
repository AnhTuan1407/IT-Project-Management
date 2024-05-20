import React, { useEffect, useState } from 'react';
import ScrollReveal from "scrollreveal";
import '../pages/homepage.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
        });

        sr.reveal(`.contact__container`, {
            origin: 'right',
            interval: 100
        });
    }, []); // Chỉ gọi useEffect một lần khi component được render

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate dữ liệu
        const nameRegex = /^[a-zA-ZÀ-ỹ ]+$/;
        if (!formData.name.match(nameRegex)) {
            alert("Tên chỉ được chứa các ký tự chữ cái và không có ký tự đặc biệt hoặc chữ số.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.match(emailRegex)) {
            alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Gửi email hoặc thực hiện các xử lý khác tại đây

        alert("Email đã được gửi thành công!");

        // Reset form sau khi gửi thành công
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <section className="contact section grid" id="contact">
                <h2 className="section__title section__title-gradient">LIÊN HỆ</h2>

                <div className="contact__container container grid">
                    <div className="contact__info">
                        <div className="contact__address">
                            <h4>Địa chỉ</h4>
                            <p><i className="bi bi-geo-alt"></i> 123 Nguyễn Tri Phương,<br />quận Hải Châu, thành phố Đà Nẵng</p>
                        </div>
                        <div className="contact__phone">
                            <h4>Điện thoại</h4>
                            <p><i className="bi bi-telephone"></i> (123) 456-7890</p>
                        </div>
                        <div className="contact__email">
                            <h4>Email</h4>
                            <p><i className="bi bi-envelope"></i> khangvan@example.com</p>
                        </div>
                    </div>

                    <div className="contact__form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Địa chỉ email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Nội dung:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="button-send-email button--flex">
                                <i className="ri-mail-send-line button__icon"></i> Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
