import React, { useState } from 'react';

const NavButtons = ({ total, count, start, end, next, previous, onPage }) => {
  const [pageCount, setPageCount] = useState(1);
  const pages = Math.ceil(parseInt(total) / parseInt(count));

  const handleOnPrevPageClick = () => {
    onPage('last', 'before: "' + start + '"');
    setPageCount((prev) => prev - 1);
  };
  const handleOnNextPageClick = () => {
    onPage('first', 'after: "' + end + '"');
    setPageCount((prev) => prev + 1);
  };

  return (
    <div className='d-flex justify-content-center my-2'>
      {previous && (
        <button
          className='btn mx-1 btn-sm btn-primary bi bi-arrow-left'
          onClick={handleOnPrevPageClick}
        ></button>
      )}
      <span className='mx-2 my-1'>
        Page: {pageCount} of {pages}
      </span>
      {next && (
        <button
          className='btn mx-1 btn-sm btn-primary bi bi-arrow-right'
          onClick={handleOnNextPageClick}
        ></button>
      )}
    </div>
  );
};

export default NavButtons;
