import React, { useState, useEffect } from 'react';
import * as TopicManagerService from '../../service/TopicManagerService';
import {storage} from "../../config/firebaseConfig";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
const TopicTable = () => {
    const [topics, setTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const topicsPerPage = 4;
    const [targetPage, setTargetPage] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [initialTopics, setInitialTopics] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await TopicManagerService.getAllTopics(currentPage, topicsPerPage, searchKeyword);
                setTopics(data.content);
                setInitialTopics(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setTargetPage(currentPage);
    }, [currentPage, searchKeyword]);

    const fetchImages = async () => {
        try {
            const imageUrls = await Promise.all(topics.map(async (topic) => {
                if (topic.image) {
                    const downloadUrl = await storage.ref(topic.image).getDownloadURL();
                    return downloadUrl;
                } else {
                    return null;
                }
            }));

            // Ensure that imageUrls has the correct length and no undefined values
            if (imageUrls.length === topics.length && !imageUrls.includes(undefined)) {
                setImageUrls(imageUrls);
            } else {
                console.error("Error fetching avatars from Firebase: Incomplete or undefined image URLs");
            }
        } catch (error) {
            console.error("Error fetching avatars from Firebase:", error);
        }
    };


    useEffect(() => {
        fetchImages();
    }, [topics]);



    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = async () => {
        try {
            console.log('Searching for:', searchKeyword);
            const data = await TopicManagerService.searchTopics(searchKeyword, 0, topicsPerPage);

            if (data.content.length === 0) {
                setTopics([]);
                setTotalPages(0);
            } else {
                setTopics(data.content);
                setTotalPages(data.totalPages);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const displayTopics = topics.map((topic, index) => {
        return (
            <div key={topic.topicId} className="col-md-3 custom-card">
                <div className="card">
                    <LazyLoadImage
                        effect="blur"
                        src={imageUrls[index]}
                        className="card-img-top"
                        alt={topic.name}
                    />
                    <div className="card-body custom-card-body">
                        <h5 className="card-title">{topic.name}</h5>
                        <div className="faculty-badge">
                            {topic.faculty && <span className="badge badge-success">{topic.faculty.name}</span>}
                        </div>
                        <p className="card-text">
                            {topic.introduce}...
                            <a
                                href={`https://firebasestorage.googleapis.com/v0/b/doanit-ee94d.appspot.com/o/${encodeURIComponent(topic.content)}?alt=media`}
                                className="btn btn-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Xem thêm
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    });


    const handleReset = () => {
        setTopics(initialTopics);
        setSearchKeyword('');
        setCurrentPage(0);
        setTargetPage(0);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (

        <>
            <section className="khang-container projects section" id="projects">
                <h2 className="section__title section__title-gradient projects__line">
                    DANH SÁCH ĐỀ TÀI
                </h2>
                <div className="row">
                    <div className="col-md-12 search-bar ml-auto">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên đề tài"
                                value={searchKeyword}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </button>
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Quay lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {topics.length === 0 ? (
                    <h3 className="text-center">Không tìm thấy dữ liệu phù hợp</h3>
                ) : (
                    <div>
                        <div className="row">{displayTopics}</div>
                        <div className="row justify-content-center">
                            <div className="col-7 justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                                <span className="input-group">
                                    <input
                                        type="number"
                                        value={targetPage + 1}
                                        onChange={(e) => setTargetPage(parseInt(e.target.value, 10) - 1)}
                                        className="form-control input-sm"
                                        min={1}
                                        max={totalPages}
                                    />
                                    <span className="input-group-text">/{totalPages}</span>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() =>
                                            setCurrentPage(Math.max(Math.min(targetPage, totalPages - 1), 0))
                                        }
                                    >
                                        Go
                                    </button>
                                </span>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Next"
                                                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                                            >
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};
export default TopicTable;
