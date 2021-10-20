import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => (
  <nav className="header__nav">
    <ul className="header__list">
      <NavLink className="header__item" to="/home">
        Home
      </NavLink>

      <NavLink className="header__item" to="/products">
        Products
        <ArrowDropDownIcon className="arrow-icon" />
      </NavLink>

      <NavLink className="header__item" to="/about">
        About
      </NavLink>

      <NavLink className="header__item" to="/signIn">
        Sign In
      </NavLink>

      <NavLink className="header__item" to="/signUp">
        Sign Up
      </NavLink>
    </ul>
  </nav>
);

export default Navbar;
