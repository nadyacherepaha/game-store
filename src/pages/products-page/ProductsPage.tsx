import React, { FC, Fragment, useState, useEffect } from "react";
import classNames from "classnames";
import { CircularProgress } from "@mui/material";
import cardStyle from "../../components/games/card-game/cardGame.module.scss";
import mainStyle from "../../styles/main.module.css";
import categoryStyle from "../../components/categories/categories.module.scss";
import FilterForm from "../../components/forms/filter-form/FilterForm";
import SearchResult from "../../components/search/SearchResult";
import { getCategories } from "../../services/category.service";
import { IFilterFormValues, Type, Criteria, Age, Genres } from "../../types/FilterForm";
import { BASE_URL } from "../../utils";
import CardGame from "../../components/games/card-game/CardGame";

const ProductsPage: FC = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getFilteredResult = async (values: IFilterFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/games?categories=${getCategories()}&criteria=${values.criteria}&type=${values.type}&genre=${
          values.genres
        }&age=${values.age}`
      );
      const result = await response.json();

      setCategory(result);
      setIsLoading(false);
    } catch (e) {
      const errorMessage = "Something went wrong";
      console.error(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilteredResult({ genres: Genres.all, age: Age.all, criteria: Criteria.name, type: Type.ascending });
  }, []);

  return (
    <div className={mainStyle.wrapperProducts}>
      <SearchResult />
      <div className={classNames(mainStyle.content, mainStyle.grid)}>
        <FilterForm getFilteredResult={getFilteredResult} />
        <div className={classNames(cardStyle.cards, categoryStyle.padding)}>
          {isLoading && <CircularProgress className={cardStyle.spinner} color="secondary" />}
          {category.length ? (
            category.map((games, index) => (
              <Fragment key={index}>
                <CardGame {...games} />
              </Fragment>
            ))
          ) : (
            <h3>Game is not found :(</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
