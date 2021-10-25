import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import style from "./navbar.module.scss";

const Navbar: FC = () => (
  <nav className="header__nav">
    <ul className={style.list}>
      <NavLink className={style.item} to="/home">
        Home
      </NavLink>

      <NavLink className={style.item} to="/products">
        Products
        <ArrowDropDownIcon className={style.arrowIcon} />
      </NavLink>

      <NavLink className={style.item} to="/about">
        About
      </NavLink>

      <NavLink className={style.item} to="/signIn">
        Sign In
      </NavLink>

      <NavLink className={style.item} to="/signUp">
        Sign Up
      </NavLink>
    </ul>
  </nav>
);

export default Navbar;
