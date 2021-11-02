import React, { FC, Fragment } from "react";
import styles from "../categories/categories.module.scss";
import game from "../../../data/games.json";
import style from "./card-game/cardGame.module.scss";
import CardGame, { ICardGameProps } from "./card-game/CardGame";

const Games: FC<ICardGameProps> = () => {
  const topGame = game.slice(0, 3);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>New Games</p>
        </div>
        <div className={style.cards}>
          {topGame.map((games, index) => (
            <Fragment key={index}>
              <CardGame {...games} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;
