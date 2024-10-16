import React from "react";
import { Link } from "react-router-dom";
import css from "./HomeList.module.css";

const HomeList = () => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <Link to="/characters">
          <div className={css.imageWrapper}>
            <img src="/images/darth-vader.jpeg" alt="" />
            <span className={css.overlayText}>Characters</span>
          </div>
        </Link>
      </li>
      <li className={css.item}>
        <Link to="/characters">
          <div className={css.imageWrapper}>
            <img src="/images/darth-vader.jpeg" alt="" />
            <span className={css.overlayText}>Characters</span>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default HomeList;
