import React, { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Dropdown, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./navbar.module.scss";
import navbar from "../../constants/navbar";

const Navbar: FC = () => {
  const history = useHistory();
  const handleClick = (e: string): void => history.push(e);

  return (
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
            {navbar.map(({ route, title }) => (
              <Dropdown.Item
                key={title}
                as={NavItem}
                onClick={() => {
                  handleClick(route);
                }}
                className={style.dropdownItem}
              >
                {title}
              </Dropdown.Item>
            ))}
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
};

export default Navbar;
