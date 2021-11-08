import HomePage from "../pages/home-page/HomePage";
import ProductsPage from "../pages/products-page/ProductsPage";
import AboutPage from "../pages/about-page/AboutPage";
import ErrorPage from "../pages/error-page/ErrorPage";
import PcPage from "../pages/category-pc/PcPage";
import PlaystationPage from "../pages/category-playstation/PlaystationPage";
import XboxPage from "../pages/category-xbox/XboxPage";
import {pcRoute, playstationRoute, xboxRoute} from "./category";

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
  {
    path: "/error",
    component: ErrorPage,
    exact: true,
  },
  {
    path: pcRoute,
    component: PcPage,
    exact: true,
  },
  {
    path: playstationRoute,
    component: PlaystationPage,
    exact: true,
  },
  {
    path: xboxRoute,
    component: XboxPage,
    exact: true,
  },
];

export default routes;
