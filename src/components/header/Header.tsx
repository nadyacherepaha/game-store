import React, { FC, memo } from "react";
import Navbar from "./Navbar";
import style from "./header.module.scss";

const Header: FC = () => (
  <header className={style.header}>
    <div className={style.link}>
      <a href="#!" className={style.logo}>
        Game Store
      </a>
    </div>
    <Navbar />
  </header>
);

export default memo(Header);
