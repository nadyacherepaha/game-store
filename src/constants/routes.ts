import HomePage from "../pages/home-page/HomePage";
import ProductsPage from "../pages/products-page/ProductsPage";
import AboutPage from "../pages/about-page/AboutPage";
import ErrorPage from "../pages/error-page/ErrorPage";
import Profile from "../pages/profile-page/Profile";
import Cart from "../pages/cart-page/Cart";

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
