import HomePage from "../pages/homePage/HomePage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import AboutPage from "../pages/aboutPage/AboutPage";
import ErrorPage from "../pages/errorPage/ErrorPage";

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
