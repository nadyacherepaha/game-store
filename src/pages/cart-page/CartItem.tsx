import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../types/Card";
import style from "./cart.module.scss";
import mainStyle from "../../styles/main.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../../redux/reducers/cartReducer";
import { playstation, xbox, pc } from "../../constants/category";

export interface ICartProps extends Card {
  dateToString: string;
  totalItemPrice: (price: number, amount: number) => string;
}

const CartItem: FC<ICartProps> = ({ id, name, price, amount, dateToString, platform, totalItemPrice }) => {
  const dispatch = useAppDispatch();

  const onInsreaseQuantity = () => {
    dispatch(addToCart({ id, amount, name, platform, price }));
  };

  const onDecreaseQuantity = () => {
    if (amount > 1) {
      dispatch(decreaseQuantity({ id, amount, name, platform, price }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const onDeleteItem = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <tbody className={style.body}>
      <tr>
        <td>{name}</td>
        <td>{price}$</td>
        <td>{totalItemPrice(price, amount)}$</td>

        <td>
          <button className={classNames(style.btnQuantity, mainStyle.btn)} type="button" onClick={onDecreaseQuantity}>
            -
          </button>

          {amount}

          <button className={classNames(style.btnQuantity, mainStyle.btn)} type="button" onClick={onInsreaseQuantity}>
            +
          </button>
        </td>

        <td>{dateToString}</td>
        <td>
          <select className={style.select} name="platform" id="">
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
        </td>
        <td>
          <button className={mainStyle.btn} type="button" onClick={onDeleteItem}>
            Delete item
            <FontAwesomeIcon className={style.icon} onClick={onDecreaseQuantity} icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
