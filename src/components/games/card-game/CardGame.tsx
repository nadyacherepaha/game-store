import React, { FC } from "react";
import { Rating } from "react-simple-star-rating";
import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./cardGame.module.scss";

export interface ICardGameProps {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  ageLimit: number;
  rating: number;
  alt: string;
  platform: {
    pc: boolean;
    playstation: boolean;
    xbox: boolean;
  };
}

const CardGame: FC<ICardGameProps> = ({ alt, name, image, price, description, ageLimit, rating, platform }) => {
  const onAlert = () => alert("Got product!");

  return (
    <>
      <div className={style.card}>
        <div className={style.front}>
          <div className={style.icons}>
            {platform?.pc && <FontAwesomeIcon icon={faWindows} size="1x" />}
            {platform?.playstation && <FontAwesomeIcon icon={faPlaystation} size="1x" />}
            {platform?.xbox && <FontAwesomeIcon icon={faXbox} size="1x" />}
          </div>
          <div className={style.image}>
            <img src={image} alt={alt} />
          </div>
          <div className={style.info}>
            <p className={style.title}>{name}</p>
            <p className={style.price}>{price}$</p>
          </div>
          <div className={style.stars}>
            <Rating ratingValue={rating} stars={5} fillColor="gold" size={20} />
          </div>
        </div>
        <div className={style.back}>
          <span className={style.desc}>{description}</span>
          <span className={style.age}>{ageLimit}+</span>
          <button type="button" className={style.btn} onClick={onAlert}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CardGame;
