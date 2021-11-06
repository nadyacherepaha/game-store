import { faXbox, faWindows, faPlaystation } from "@fortawesome/free-brands-svg-icons";

export const pc: string = "/category/pc";
export const playstation: string = "/category/playstation";
export const xbox: string = "/category/xbox";

const category = [
  {
    icon: faWindows,
    title: "PC",
    link: pc,
  },
  {
    icon: faPlaystation,
    title: "Playstation 5",
    link: playstation,
  },
  {
    icon: faXbox,
    title: "XBox One",
    link: xbox,
  },
];

export default category;
