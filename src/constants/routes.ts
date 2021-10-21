// import React, { Component, StrictMode } from "react";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import AboutPage from "../pages/aboutPage/AboutPage";

const routes = [
  {
    path: "/home",
    component: HomePage,
    exact: false,
  },
  {
    path: "/products",
    component: ProductsPage,
    exact: true,
  },
  {
    path: "/about",
    component: AboutPage,
    exact: true,
  },
];

export default routes;
