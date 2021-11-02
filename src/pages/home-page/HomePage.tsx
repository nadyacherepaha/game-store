import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import style from "../../styles/main.module.css";
import Categories from "../../components/categories/Categories";
import SearchResult from "../../components/search/SearchResult";
import Games from "../../components/games/Games";

const HomePage: FC = () => (
  <>
    <Header />
    <div className={style.wrapper}>
      <div className={style.content}>
        <SearchResult />
        <Categories />
        <Games<ICardGameProps> />
      </div>
    </div>
    <Footer />
  </>
);

export default HomePage;
