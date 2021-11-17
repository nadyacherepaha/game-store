import React, { FC, Fragment } from "react";
import classNames from "classnames";
import CardGame from "../../components/games/card-game/CardGame";
import { BASE_URL } from "../../utils";
import cardStyle from "../../components/games/card-game/cardGame.module.scss";
import mainStyle from "../../styles/main.module.css";
import categoryStyle from "../../components/categories/categories.module.scss";

const PlaystationPage: FC = () => {
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/games?categories=playstation`);
        const result = await response.json();
        setCategory(result);
      } catch (e) {
        const errorMessage = "Something went wrong";
        console.error(errorMessage);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={mainStyle.content}>
      <div className={classNames(cardStyle.cards, categoryStyle.padding)}>
        {category?.length &&
          category.map((games, index) => (
            <Fragment key={index}>
              <CardGame {...games} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default PlaystationPage;
