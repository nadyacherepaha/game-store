import React, { FC, Fragment } from "react";
import classNames from "classnames";
import CardGame from "../../components/games/card-game/CardGame";
import { BASE_URL } from "../../utils";
import cardStyle from "../../components/games/card-game/cardGame.module.scss";
import mainStyle from "../../styles/main.module.css";
import categoryStyle from "../../components/categories/categories.module.scss";
import FilterForm from "../../components/forms/filter-form/FilterForm";
import SearchResult from "../../components/search/SearchResult";

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
    <div className={mainStyle.wrapperProducts}>
      <SearchResult />
      <div className={classNames(mainStyle.content, mainStyle.grid)}>
        <FilterForm />
        <div className={classNames(cardStyle.cards, categoryStyle.padding)}>
          {category?.length &&
            category.map((games, index) => (
              <Fragment key={index}>
                <CardGame {...games} />
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlaystationPage;
