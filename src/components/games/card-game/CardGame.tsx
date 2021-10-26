import React, { FC } from "react";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome/FontAwesomeIcon";
import { faXbox, faWindows, faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome//free-solid-svg-icons";
import overwatch from "../../../assets/images/overwatch.jpg";
import style from "./cardGame.module.scss";

const CardGame: FC = () => (
  <div className={style.card}>
    <div className={style.front}>
      <div className={style.icons}>
        <FontAwesomeIcon icon={faWindows} size="1x" />
        <FontAwesomeIcon icon={faPlaystation} size="1x" />
        <FontAwesomeIcon icon={faXbox} size="1x" />
      </div>
      <div className="image">
        <img src={overwatch} alt="overwatch" />
        <div className="info">
          <div className="main">
            <div className="title">
              <span>Overwatch</span>
            </div>
            <div className="price">
              <span>23.99$</span>
            </div>
          </div>
          <div className="stars">
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
          </div>
        </div>
      </div>
    </div>
    <div className={style.back}>
      <div className="desc" />
      <div className="age" />
      <div className="btn" />
    </div>
  </div>
);

export default CardGame;
