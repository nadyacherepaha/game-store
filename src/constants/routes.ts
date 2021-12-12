import React from "react";
import HomePage from "../pages/home-page/HomePage";
import Cart from "../pages/cart-page/Cart";

const ProductsPage = React.lazy(() => import("../pages/products-page/ProductsPage"));
const AboutPage = React.lazy(() => import("../pages/about-page/AboutPage"));
const ErrorPage = React.lazy(() => import("../pages/error-page/ErrorPage"));
const Profile = React.lazy(() => import("../pages/profile-page/Profile"));

const routes = [
  {
    path: "/home",
    component: HomePage,
    exact: false,
  },
  {
    path: "/about",
    component: AboutPage,
    exact: true,
  },
  {
    path: "/error",
    component: ErrorPage,
    exact: true,
  },
  {
    path: "/category/:platforms",
    component: ProductsPage,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: false,
  },
  {
    path: "/cart",
    component: Cart,
    exact: false,
  },
];

export default routes;
