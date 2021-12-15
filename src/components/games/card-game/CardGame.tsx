import React, { FC, memo, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import style from "./cardGame.module.scss";
import btnStyle from "../../../styles/main.module.css";
import { ICard } from "../../../types/Card";
import cartSlice from "../../../redux/reducers/cartReducer";
import { useAppSelector } from "../../../hooks/redux";
import getAdmin from "../../../redux/selectors/adminSelectors";
import EditCardForm, { displayButtonEditCard } from "../../forms/edit-card-form/EditCardForm";
import { getAdminRole } from "../../../services/auth.service";
import adminSlice from "../../../redux/reducers/adminReducer";

export interface ICardGameProps extends ICard {
  rating: number;
}

const CardGame: FC<ICardGameProps> = ({
  id,
  amount,
  alt,
  name,
  image,
  price,
  description,
  ageLimit,
  rating,
  platform,
}) => {
  const dispatch = useDispatch();
  const { addToCart } = cartSlice.actions;
  const { signInAdminInLocalStorage } = adminSlice.actions;
  const { roleAdmin } = useAppSelector(getAdmin);

  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(addToCart({ id, amount, name, platform, price }));
  };

  useEffect(() => {
    if (getAdminRole()) {
      dispatch(signInAdminInLocalStorage());
    }
  }, []);

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
            <img src={image || defaultImage} alt={alt} />
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

          {roleAdmin ? (
            <>
              <div className={btnStyle.buttons}>
                <button type="button" className={btnStyle.btn} onClick={handleClick}>
                  Add to cart
                </button>
                <EditCardForm
                  subscription={{ values: true }}
                  id={id}
                  display={displayButtonEditCard}
                  buttonTitle="Edit"
                />
              </div>
            </>
          ) : (
            <button type="button" className={btnStyle.btn} onClick={handleClick}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const areEqualCardGameProps = (prevCardGame: ICardGameProps, nextCardGame: ICardGameProps) =>
  prevCardGame.id === nextCardGame.id &&
  prevCardGame.name === nextCardGame.name &&
  prevCardGame.amount === nextCardGame.amount &&
  prevCardGame.image === nextCardGame.image &&
  prevCardGame.price === nextCardGame.price &&
  prevCardGame.description === nextCardGame.description &&
  prevCardGame.alt === nextCardGame.alt &&
  prevCardGame.ageLimit === nextCardGame.ageLimit &&
  prevCardGame.platform === nextCardGame.platform &&
  prevCardGame.rating === nextCardGame.rating;

export default memo(CardGame, areEqualCardGameProps);
