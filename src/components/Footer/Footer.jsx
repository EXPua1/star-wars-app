import React from "react";
import css from "./Foooter.module.css";

const Footer = () => {
  return (
    <footer className={css.footerContainer}>
      <div className={css.footer}>
        <p>
          Images used are from "Star Wars" films. © Lucasfilm Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
