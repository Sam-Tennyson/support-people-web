import React from 'react'
import ReactPaginate from 'react-paginate'
import "./style.scss"

const ReactPagination = ({handlePageClick,pageCount }) => {
  return (
    <>
        <ReactPaginate
            activeClassName={'item active '}
            breakClassName={'item break-me '}
            breakLabel={'...'}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            marginPagesDisplayed={2}
            nextClassName={"item next "}
            pageCount={pageCount}
            pageClassName={'item pagination-page '}
            pageRangeDisplayed={2}
            previousClassName={"item previous"}
            nextLabel="next >"
            onPageChange={handlePageClick}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
      />
    </>
  )
}

export default ReactPagination