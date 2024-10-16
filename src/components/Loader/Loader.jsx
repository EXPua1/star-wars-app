// src/components/Loader.jsx
import React from "react";
import css from "./Loader.module.css";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={css.loader}>
      <Circles
        height={80} // Указываем высоту
        width={80} // Указываем ширину
        color="#00BFFF" // Цвет загрузчика
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
