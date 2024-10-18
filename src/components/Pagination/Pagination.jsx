import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ nextPage, prevPage, onNext, onPrev }) => {
  return (
    <div className={css.pagination}>
      <button onClick={onPrev} disabled={!prevPage}>
        Previous
      </button>
      <button onClick={onNext} disabled={!nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
