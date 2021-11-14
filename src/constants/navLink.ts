import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { user } from "../services/auth.service";

const navLink = [
  {
    path: "/profile",
    title: user && user.login,
    icon: faUser,
  },
  {
    path: "/cart",
    title: "Cart",
    icon: faShoppingCart,
  },
];

export default navLink;
