import React, { FC, Fragment } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardGame, { ICardGameProps } from "../../components/games/card-game/CardGame";
import { BASE_URL } from "../../utils";
import cardStyle from "../../components/games/card-game/cardGame.module.scss";
import mainStyle from "../../styles/main.module.css";
import categoryStyle from "../../components/categories/categories.module.scss";

const PcPage: FC<ICardGameProps> = () => {
const [category, setCategory] = React.useState(null);
  React.useEffect(() => {
    fetch(`${BASE_URL}/games/categories=pc`)
    .then(response => response.json())
    .then(data => {
      setCategory(data)
    })
  },[])

  return (
    <div>
      <Header />
      <div className={mainStyle.content}>
        <div className={`${cardStyle.cards} ${categoryStyle.padding}`}>
          {category && category.map((games: string[], index: number) => (
              <Fragment key={index}>
                <CardGame {...games} />
              </Fragment>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PcPage;