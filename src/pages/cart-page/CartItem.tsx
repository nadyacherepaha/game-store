import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ICard } from "../../types/Card";
import style from "./cart.module.scss";
import mainStyle from "../../styles/main.module.css";
import { useAppDispatch } from "../../hooks/redux";
import cartSlice from "../../redux/reducers/cartReducer";
import { playstation, xbox, pc } from "../../constants/category";

export interface ICartProps extends ICard {
  currentDate: string;
  totalItemPrice: (price: number, amount: number) => string;
}

const CartItem: FC<ICartProps> = ({ id, name, price, amount, currentDate, platform, totalItemPrice }) => {
  const dispatch = useAppDispatch();
  const { removeFromCart, decreaseStuffQuantity, addToCart } = cartSlice.actions;

  const onInsreaseQuantity = () => {
    dispatch(addToCart({ id, amount, name, platform, price }));
  };

  const onDecreaseQuantity = () => {
    if (amount > 1) {
      dispatch(decreaseStuffQuantity({ id, amount, name, platform, price }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const onDeleteItem = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={style.body}>
      <p>{name}</p>
      <p>{price}$</p>
      <p>{totalItemPrice(price, amount)}$</p>

      <p>
        <button className={classNames(style.btnQuantity, mainStyle.btn)} type="button" onClick={onDecreaseQuantity}>
          -
        </button>

        {amount}

        <button className={classNames(style.btnQuantity, mainStyle.btn)} type="button" onClick={onInsreaseQuantity}>
          +
        </button>
      </p>

      <p>{currentDate}</p>
      <p>
        <select className={style.select} name="platform">
          <option value="all" defaultValue="Select platform" disabled>
            Select platform
          </option>
          {platform.pc && (
            <option className={style.option} value={pc}>
              {pc}
            </option>
          )}
          {platform.xbox && (
            <option className={style.option} value={xbox}>
              {xbox}
            </option>
          )}
          {platform.playstation && (
            <option className={style.option} value={playstation}>
              {playstation}
            </option>
          )}
        </select>
      </p>
      <p>
        <button className={mainStyle.btn} type="button" onClick={onDeleteItem}>
          Delete item
          <FontAwesomeIcon className={style.icon} onClick={onDecreaseQuantity} icon={faTrashAlt} />
        </button>
      </p>
    </div>
  );
};

export default CartItem;
