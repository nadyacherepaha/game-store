import HomePage from "../pages/home-page/HomePage";
import ProductsPage from "../pages/products-page/ProductsPage";
import AboutPage from "../pages/about-page/AboutPage";
import ErrorPage from "../pages/error-page/ErrorPage";

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
];

export default routes;
