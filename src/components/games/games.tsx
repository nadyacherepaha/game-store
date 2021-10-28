import React, { FC } from "react";
import CardGame from "./card-game/CardGame";
import style from "./games.module.scss";
import styles from "../categories/categories.module.scss";

const Games: FC = () => (
  <>
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>New Games</p>
      </div>
      <div className={style.cards}>
        <CardGame />
      </div>
    </div>
  </>
);

export default Games;
