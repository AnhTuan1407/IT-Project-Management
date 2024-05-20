import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

export const PaginationNav = ({pageNumber, totalPages, setPageNumber, searchKeyTmp, setSearchKeyTmp}) => {
    const [targetPage, setTargetPage] = useState(0);
    const pageCount = totalPages;
    useEffect(() => {
        setTargetPage(0);
        
    }, [searchKeyTmp]);
    const handleGoButtonClick = () => {
        if (targetPage < 0 || targetPage >= pageCount) {
            toast.error("Số trang không hợp lệ.")
            setTargetPage(0)
            setPageNumber(0);
        } else {
            setPageNumber(targetPage);
            console.log(targetPage)
        }
    };
    return (<div className="row justify-content-center" style={{marginTop:"60px"}}>
        <div className="col-7 justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={() => setPageNumber((prevPage) => {
                                const newPageNumber = Math.max(prevPage - 1, 0)
                                setTargetPage(newPageNumber);
                                return newPageNumber
                            })}
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
                      max={pageCount}
                  />
                  <span className="input-group-text">/{pageCount}</span>
                  <button
                      className="btn btn-success btn-sm"
                      onClick={handleGoButtonClick}
                  >
                    Go
                  </button>
                </span>
                    </li>
                    <li className={`page-item ${pageNumber === totalPages - 1 ? "disabled" : ""}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => setPageNumber((prevPage) => {
                                const newPageNumber = Math.min(prevPage + 1, totalPages - 1);
                                setTargetPage(newPageNumber);
                                return newPageNumber;
                            })}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>)
}
