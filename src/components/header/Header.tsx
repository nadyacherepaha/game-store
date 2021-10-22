import React, { FC } from "react";
import Navbar from "./Navbar";
import style from "./header.module.scss";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <header className={style.header}>
    <div className={style.link}>
      <a href="#!" className={style.logo}>
        Game Store
      </a>
    </div>
    <Navbar />
  </header>
);

export default Header;
