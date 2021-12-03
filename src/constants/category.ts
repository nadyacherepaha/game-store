import { faXbox, faWindows, faPlaystation } from "@fortawesome/free-brands-svg-icons";

export const pcRoute = "/category/pc";
export const playstationRoute = "/category/playstation";
export const xboxRoute = "/category/xbox";

export const playstation = "playstation";
export const xbox = "xbox";
export const pc = "pc";

const category = [
  {
    icon: faWindows,
    title: "PC",
    link: pcRoute,
  },
  {
    icon: faPlaystation,
    title: "Playstation 5",
    link: playstationRoute,
  },
  {
    icon: faXbox,
    title: "XBox One",
    link: xboxRoute,
  },
];

export default category;
