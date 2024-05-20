import React, {useState} from "react";

export const PaginationNav = ({pageNumber, totalPages, setPageNumber}) => {
    const [targetPage, setTargetPage] = useState(0);
    const pageCount = totalPages;
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
                      className="btn btn-primary btn-sm"
                      onClick={() => setPageNumber(Math.max(Math.min(targetPage, pageCount - 1), 0))}
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
