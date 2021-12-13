import React, { FC, Fragment, memo } from "react";
import styles from "../categories/categories.module.scss";
import { BASE_URL } from "../../constants/baseUrl";
import style from "./card-game/cardGame.module.scss";
import CardGame from "./card-game/CardGame";

const Games: FC = () => {
  const [topGames, setTopGames] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/games-top`);
        const result = await response.json();
        setTopGames(result);
      } catch (e) {
        const errorMessage = "Something went wrong";
        console.error(errorMessage);
      }
    };
    fetchData();
  }, []);

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

export default memo(Games);
