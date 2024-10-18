import style from "./Container.module.css";
import React from "react";

const Container = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
