import React, { FC, Fragment } from "react";
import styles from "../categories/categories.module.scss";
import { BASE_URL } from "../../utils";
import style from "./card-game/cardGame.module.scss";
import CardGame, { ICardGameProps } from "./card-game/CardGame";

const Games: FC<ICardGameProps> = () => {
  const [topGames, setTopGames] = React.useState(null);
  React.useEffect(() => {
    fetch(`${BASE_URL}/games-top`)
    .then(response => response.json())
    .then(data => {
      setTopGames(data)
    })
  },[])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>New Games</p>
        </div>
        <div className={style.cards}>
          {topGames?.length &&
            topGames.map((games, index) => (
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
