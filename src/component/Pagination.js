import React from 'react';
import '../assets/jss/components/Pagination.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PropTypes } from 'prop-types';

function Pagination(props) {
  const { pagination, onPageChange, rowAll } = props;
  const { page, limit } = pagination;
  
  let totalPages = Math.ceil(rowAll / limit)
  // if (isNullOrUndefined(rowSearch)) {
  //   totalPages = Math.ceil(rowAll / limit)
  // } else {
  //   totalPages = 1
  // }

  // console.log(rowAll)
  const handlePageChange = (e) => {
    // console.log(e)
    if(onPageChange) {
      onPageChange(e)
    }
  };
  return (
    <div className="formPagination">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={page <=  1 ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              disabled={page <=  1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
          </li>
          <li className={page <=  1 ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page -1)}
            >
              {page - 1}
            </button>
          </li>
          <li className="page-item active">
            <button
              className="page-link"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
          <li className={page >= totalPages ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          </li>
          <li className={page >= totalPages ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  rowAll: PropTypes.number,
};
Pagination.defaultProps = {
  onPageChange: null,
};
export default Pagination;