import React, {useEffect} from 'react';
import ScrollReveal from "scrollreveal";
import '../pages/homepage.css'

const Projects = () => {
    useEffect(() => {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
        });

        sr.reveal(`.custom-card`, {
            origin: 'left',
            interval: 100,
        });
    }, []); // Chỉ gọi useEffect một lần khi component được render
    return (
        <>
            <section className="khang-container projects section" id="projects">
                <h2 className="section__title section__title-gradient projects__line">
                    ĐỀ TÀI NỔI BẬT
                </h2>

                <div className="row">
                    <div className="col-md-3 custom-card">
                        <div className="card">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/doan1.jpg`} className="card-img-top" alt="Đồ án 1" />
                            <div className="card-body">
                                <h5 className="card-title">Tìm hiểu công nghệ thực tại ảo và ứng dụng</h5>
                                <p className="card-text">
                                    Thực tế ảo là một thuật ngữ mới xuất hiện khoảng đầu thập kỷ 90, nhưng ở Mỹ và Châu Âu,
                                    thực tế ảo (Virtual Reallity) đã và đang trở thành một công nghệ mũi nhọn nhờ khả năng
                                    ứng dụng rộng rãi trong mọi lĩnh vực...

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 custom-card">
                        <div className="card">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/doan2.jpg`} className="card-img-top" alt="Đồ án 2" />
                            <div className="card-body">
                                <h5 className="card-title">Thiết kế đồ án thi công thoát nước đô thị</h5>
                                <p className="card-text">
                                    Cống là một công trình nhân tạo khá phổ biến trên một tuyến đường. Tác dụng chủ yếu của
                                    cống là dùng để thoát nước của các dòng chảy thường xuyên hay định kỳ...

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 custom-card">
                        <div className="card">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/doan3.jpg`} className="card-img-top" alt="Đồ án 3" />
                            <div className="card-body">
                                <h5 className="card-title">Kế toán chi phí sản xuất và tính giá thành sản phẩm tại Công ty Bình Minh</h5>
                                <p className="card-text">
                                    Việc hạch toán đầy đủ chính xác chi phí sản phẩm và giá thành của sản phẩm là việc làm
                                    cấp thiết khách quan và có ý nghĩa rất quan trọng nhất là trong điều kiện nền kinh tế
                                    thị trường...

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 custom-card">
                        <div className="card">
                            <img src={`${process.env.PUBLIC_URL}/assets/img/doan3.jpg`} className="card-img-top" alt="Đồ án 4" />
                            <div className="card-body">
                                <h5 className="card-title">Quản lý thương mại điện tử</h5>
                                <p className="card-text">
                                    Phương thức mới để quản lý doanh nghiệp thông qua thương mại điện tử đang ngày càng trở
                                    nên phổ biến và quan trọng...

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Projects;
