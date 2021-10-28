import React, { FC } from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./navbar.module.scss";

const Navbar: FC = () => (
  <nav>
    <ul className={style.list}>
      <NavLink className={style.item} to="/home">
        Home
      </NavLink>

      <Dropdown className={style.dropdown}>
        <Dropdown.Toggle className={style.btn} variant="dark" id="dropdown-basic">
          Products
        </Dropdown.Toggle>
        <Dropdown.Menu className={style.dropdownMenu}>
          <Dropdown.Item as={NavItem} className={style.dropdownItem} eventKey="baudratestate2400">
            <Link to="/products">PC</Link>
          </Dropdown.Item>
          <Dropdown.Item as={NavItem} className={style.dropdownItem} eventKey="baudratestate4800">
            <Link to="/home">Playstation 5</Link>
          </Dropdown.Item>
          <Dropdown.Item as={NavItem} className={style.dropdownItem} eventKey="baudratestate2400">
            <Link to="/about">XBox One</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
