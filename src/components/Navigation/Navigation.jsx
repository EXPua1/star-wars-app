import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = ({ characterName }) => {
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
          const isLastItem = index === pathnames.length - 1; // checking for last element
          return (
            <li key={to}>
              <span className={css.separator}>/</span>
              <NavLink
                to={to}
                className={
                  ({ isActive }) => (isLastItem ? css.current : css.previous) //makes active last element
                }
              >
                {isLastItem && characterName
                  ? characterName // using name of character for last element
                  : capitalizeFirstLetter(value)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
