import React, { FC, Fragment } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardGame, { ICardGameProps } from "../../components/games/card-game/CardGame";
import game from "../../../data/games.json";
import cardStyle from "../../components/games/card-game/cardGame.module.scss";
import mainStyle from "../../styles/main.module.css";
import categoryStyle from "../../components/categories/categories.module.scss";

const XboxPage: FC<ICardGameProps> = () => (
  <div>
    <Header />
    <div className={mainStyle.content}>
      <div className={`${cardStyle.cards} ${categoryStyle.padding}`}>
        {game
          .filter((category) => category.platform.xbox)
          .map((games, index) => (
            <Fragment key={index}>
              <CardGame {...games} />
            </Fragment>
          ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default XboxPage;
