import { pcRoute, playstationRoute, xboxRoute } from "../constants/category";

export const getCategories = () => {
  const location = window.location.pathname;
  const playstation = "playstation";
  const xbox = "xbox";
  const pc = "pc";

  if (location === playstationRoute) {
    return playstation;
  }
  if (location === pcRoute) {
    return pc;
  }
  if (location === xboxRoute) {
    return xbox;
  }
};
