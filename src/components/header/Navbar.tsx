import React, { FC, memo } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Dropdown, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import style from "./navbar.module.scss";
import navbar from "../../constants/navbar";
import LoginForm from "../forms/login-form/LoginForm";
import RegistrationForm from "../forms/registration-form/RegistrationForm";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { deleteUserFromLocalStorage } from "../../redux/actions/userActions";
import getUser from "../../redux/selectors/authSelectors";
import getQuantity from "../../redux/selectors/cartSelectors";
import { userSlice } from "../../redux/reducers/userReducer";
import { currentUserExists } from "../../services/auth.service";
import { deleteAdminFromLocalStorage } from "../../redux/actions/adminActions";

const Navbar: FC = () => {
  const { user } = useAppSelector(getUser);
  const { itemInCart } = useAppSelector(getQuantity);
  const itemsQuantity = itemInCart.length;
  const { signInUserInLocalStorage } = userSlice.actions;
  const dispatch = useAppDispatch();

  const history = useHistory();
  const handleClick = (e: string): void => history.push(e);

  React.useEffect(() => {
    if (currentUserExists()) {
      dispatch(signInUserInLocalStorage());
    }
  }, []);

  const onLogout = () => {
    dispatch(deleteAdminFromLocalStorage());
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
            <NavLink className={style.item} to="/profile">
              <FontAwesomeIcon className={style.icon} icon={faUser} />
              User
            </NavLink>
            <NavLink className={style.item} to="/cart">
              <FontAwesomeIcon className={style.icon} icon={faShoppingCart} />
              <span>{itemsQuantity || "Cart"}</span>
            </NavLink>
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

export default memo(Navbar);
