import React from "react";
import css from "./HomeList.module.css";

const HomeList = () => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <div className={css.imageWrapper}>
          <img src="/public/images/darth-vader.jpeg" alt="" />
          <span className={css.overlayText}>Characters</span>
        </div>
      </li>
      <li className={css.item}>
        <div className={css.imageWrapper}>
          <img src="/public/images/darth-vader.jpeg" alt="" />
          <span className={css.overlayText}>Characters</span>
        </div>
      </li>
    </ul>
  );
};

export default HomeList;
