import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav>
      <ul className={css.navigation}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Home
          </NavLink>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              <span className={css.separator}>/</span>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? css.current : css.previous
                }
              >
                {capitalizeFirstLetter(value)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
