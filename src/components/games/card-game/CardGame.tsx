import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import card from "../../../constants/card";
import style from "./cardGame.module.scss";

const CardGame: FC = () => (
  <>
    {card.map(({ xbox, playstation, windows, imageLink, alt, title, price, desc, age, btn }) => (
      <div key={title} className={style.card}>
        <div className={style.front}>
          <div className={style.icons}>
            <FontAwesomeIcon icon={windows} size="1x" />
            <FontAwesomeIcon icon={playstation} size="1x" />
            <FontAwesomeIcon icon={xbox} size="1x" />
          </div>
          <div className={style.image}>
            <img src={imageLink} alt={alt} />
          </div>
          <div className={style.info}>
            <p>{title}</p>
            <p>{price}</p>
          </div>
          <div className={style.stars}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className={style.back}>
          <div>
            <span className={style.desc}>{desc}</span>
            <span className={style.age}>{age}</span>
            <button type="button" className={style.btn}>
              {btn}
            </button>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default CardGame;
