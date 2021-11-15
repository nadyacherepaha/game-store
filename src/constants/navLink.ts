import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { userStr } from "../services/auth.service";

const navLink = [
  {
    path: "/profile",
    title: userStr,
    icon: faUser,
  },
  {
    path: "/cart",
    title: "Cart",
    icon: faShoppingCart,
  },
];

export default navLink;
