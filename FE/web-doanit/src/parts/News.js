
import React, { useState, useEffect } from 'react';
import '../pages/homepage.css'

const News = () => {
    const [counter, setCounter] = useState(1);
    let myslide, dot;
    let timer;

    useEffect(() => {
        myslide = document.querySelectorAll('.myslide');
        dot = document.querySelectorAll('.dot');

        if (myslide.length > 0 && dot.length > 0) {
            slidefun(counter);
            timer = setInterval(autoSlide, 8000);
        }

        return () => clearInterval(timer);
    }, [counter, myslide, dot]);

    function autoSlide() {
        setCounter((prevCounter) => {
            slidefun(prevCounter + 1);
            return prevCounter + 1;
        });

    }

    function plusSlides(n) {
        setCounter((prevCounter) => prevCounter + n);
        slidefun(counter);
        resetTimer();
    }

    function currentSlide(n) {
        setCounter(n);
        slidefun(counter);
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoSlide, 8000);
    }

    function slidefun(n) {
        let i;
        for (i = 0; i < myslide.length; i++) {
            if (myslide[i]) {
                myslide[i].style.display = 'none';
            }
        }
        for (i = 0; i < dot.length; i++) {
            if (dot[i]) {
                dot[i].className = dot[i].className.replace(' active', '');
            }
        }

        if (n > myslide.length) {
            setCounter(1);
        }
        if (n < 1) {
            setCounter(myslide.length);
        }

        if (myslide[n - 1]) {
            myslide[n - 1].style.display = 'block';
        }
        if (dot[n - 1]) {
            dot[n - 1].className += ' active';
        }
    }



    return (
        <>
            <section className="news section grid" id="news">
                <h2 className="section__title section__title-gradient">TIN TỨC</h2>
                <div className="slider">
                    <div className="myslide fade">
                        <div className="txt">
                            <p>Web Devoloper<br/>Codegym lọt top 50 đơn vị Edtech Đông Nam Á</p>
                            <a href="https://codegym.vn/blog/2023/11/09/codegym-lot-top-50-don-vi-edtech-dong-nam-a-nam-2023/"
                               target="_blank">Xem chi tiết</a>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/img1.jpg`} className="slideimg"/>
                    </div>

                    <div className="myslide fade">
                        <div className="txt">
                            <p>Web Devoloper<br/>USAID WISE - CodeGym | Ký kết hợp tác chuyển đổi VIỆC LÀM SỐ CHO NGƯỜI LAO
                                ĐỘNG</p>
                            <a href="https://codegym.vn/blog/2023/11/07/usaid-wise-codegym-ky-ket-hop-tac/"
                               target="_blank">Xem chi tiết</a>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/img2.jpg`} className="slideimg"/>
                    </div>

                    <div className="myslide fade">
                        <div className="txt">
                            <p>Web Devoloper<br/>[CodeGym Huế] Khai giảng lớp Python Miễn Phí ngày 20/09</p>
                            <a href="https://codegym.vn/blog/2023/09/25/codegym-hue-khai-giang-lop-python-mien-phi-ngay-20-09/"
                               target="_blank">Xem chi tiết</a>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/img3.jpg`} className="slideimg"/>
                    </div>

                    <div className="myslide fade">
                        <div className="txt">
                            <p>Web Devoloper<br/>Lộ trình đào tạo Kỹ sư cầu nối nhật bản (BRSE) tại CodeGym Hà Nội</p>
                            <a href="https://codegym.vn/blog/2023/09/20/lo-trinh-dao-tao-ky-su-cau-noi-nhat-ban-brse-tai-codegym-ha-noi/"
                               target="_blank">Xem chi tiết</a>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/img4.jpg`} className="slideimg"/>
                    </div>

                    <div className="myslide fade">
                        <div className="txt">
                            <p>Web Devoloper<br/>[RECAP] Techtalk “Nguyện vọng nào cho 2K5 đam mê CNTT?”</p>
                            <a href="https://codegym.vn/blog/2023/09/19/recap-techtalk-nguyen-vong-nao-cho-2k5-dam-me-cntt/"
                               target="_blank">Xem chi tiết</a>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/img5.jpg`} className="slideimg"/>
                    </div>

                    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
                    <div className="dotsbox" style={{ textAlign: 'center' }}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span key={index} className={`dot ${counter === index ? 'active' : ''}`} onClick={() => currentSlide(index)}></span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default News;



// <h2 className="section__title section__title-gradient">TIN TỨC</h2>
// <div className="slider">
//     <div className="myslide fade">
//         <div className="txt">
//             <p>Web Devoloper<br/>Codegym lọt top 50 đơn vị Edtech Đông Nam Á</p>
//             <a href="https://codegym.vn/blog/2023/11/09/codegym-lot-top-50-don-vi-edtech-dong-nam-a-nam-2023/"
//                target="_blank">Xem chi tiết</a>
//         </div>
//         <img src={`${process.env.PUBLIC_URL}/assets/img/img1.jpg`} className="slideimg"/>
//     </div>
//
//     <div className="myslide fade">
//         <div className="txt">
//             <p>Web Devoloper<br/>USAID WISE - CodeGym | Ký kết hợp tác chuyển đổi VIỆC LÀM SỐ CHO NGƯỜI LAO
//                 ĐỘNG</p>
//             <a href="https://codegym.vn/blog/2023/11/07/usaid-wise-codegym-ky-ket-hop-tac/"
//                target="_blank">Xem chi tiết</a>
//         </div>
//         <img src={`${process.env.PUBLIC_URL}/assets/img/img2.jpg`} className="slideimg"/>
//     </div>
//
//     <div className="myslide fade">
//         <div className="txt">
//             <p>Web Devoloper<br/>[CodeGym Huế] Khai giảng lớp Python Miễn Phí ngày 20/09</p>
//             <a href="https://codegym.vn/blog/2023/09/25/codegym-hue-khai-giang-lop-python-mien-phi-ngay-20-09/"
//                target="_blank">Xem chi tiết</a>
//         </div>
//         <img src={`${process.env.PUBLIC_URL}/assets/img/img3.jpg`} className="slideimg"/>
//     </div>
//
//     <div className="myslide fade">
//         <div className="txt">
//             <p>Web Devoloper<br/>Lộ trình đào tạo Kỹ sư cầu nối nhật bản (BRSE) tại CodeGym Hà Nội</p>
//             <a href="https://codegym.vn/blog/2023/09/20/lo-trinh-dao-tao-ky-su-cau-noi-nhat-ban-brse-tai-codegym-ha-noi/"
//                target="_blank">Xem chi tiết</a>
//         </div>
//         <img src={`${process.env.PUBLIC_URL}/assets/img/img4.jpg`} className="slideimg"/>
//     </div>
//
//     <div className="myslide fade">
//         <div className="txt">
//             <p>Web Devoloper<br/>[RECAP] Techtalk “Nguyện vọng nào cho 2K5 đam mê CNTT?”</p>
//             <a href="https://codegym.vn/blog/2023/09/19/recap-techtalk-nguyen-vong-nao-cho-2k5-dam-me-cntt/"
//                target="_blank">Xem chi tiết</a>
//         </div>
//         <img src={`${process.env.PUBLIC_URL}/assets/img/img5.jpg`} className="slideimg"/>
//     </div>
//
//     <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
//     <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
//     <div className="dotsbox" style={{ textAlign: 'center' }}>
//         {[1, 2, 3, 4, 5].map((index) => (
//             <span key={index} className={`dot ${counter === index ? 'active' : ''}`} onClick={() => currentSlide(index)}></span>
//         ))}
//     </div>
// </div>

