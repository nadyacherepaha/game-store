import React, { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Dropdown, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./navbar.module.scss";
import navbar from "../../constants/navbar";
import navLink from "../../constants/navLink";
import LoginForm from "../forms/login-form/LoginForm";
import RegistrationForm from "../forms/registration-form/RegistrationForm";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { deleteUserFromLocalStorage } from "../../redux/actions/userActions";
import getUser from "../../redux/selectors/authSelectors";
import { userSlice } from "../../redux/reducers/userReducer";
import { getCurrentUser } from "../../services/auth.service";

const Navbar: FC = () => {
  const { user } = useAppSelector(getUser);
  const { signInUserInLocalStorage } = userSlice.actions;
  const dispatch = useAppDispatch();

  const history = useHistory();
  const handleClick = (e: string): void => history.push(e);

  React.useEffect(() => {
    if (getCurrentUser()) {
      dispatch(signInUserInLocalStorage());
    }
  }, []);

  const onLogout = () => {
    dispatch(deleteUserFromLocalStorage());
    history.push("/home");
  };

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

        {user ? (
          <>
            {navLink.map(({ path, title, icon }) => (
              <NavLink key={path} className={style.item} to={path}>
                <FontAwesomeIcon className={style.icon} icon={icon} />
                {title}
              </NavLink>
            ))}
            <button className={style.item} type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <LoginForm />
            <RegistrationForm />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
