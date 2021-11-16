import React, { FC } from "react";
import style from "../../styles/main.module.css";
import Categories from "../../components/categories/Categories";
import SearchResult from "../../components/search/SearchResult";
import Games from "../../components/games/Games";

const HomePage: FC = () => (
  <div className={style.wrapper}>
    <div className={style.content}>
      <SearchResult />
      <Categories />
      <Games />
    </div>
  </div>
);

export default HomePage;
