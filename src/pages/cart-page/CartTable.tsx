import React, { FC } from "react";
import classNames from "classnames";
import { Card } from "../../types/Card";
import style from "./cart.module.scss";
import mainStyle from "../../styles/main.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/reducers/cartReducer";
import { playstation, xbox, pc } from "../../constants/category";

export interface ICartProps extends Card {
  dateToString: string;
}

const CartTable: FC<ICartProps> = ({ id, name, price, amount, dateToString, platform }) => {
  const dispatch = useAppDispatch();

  const onInsreaseQuantity = () => {
    dispatch(increaseQuantity(amount));
  };

  const onDecreaseQuantity = () => {
    dispatch(decreaseQuantity(amount));
  };

  const calcItemPrice = (price: number, amount: number) => Number(price * amount).toFixed(2);

  const onDeleteItem = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <tbody className={style.body}>
      <tr>
        <td>{name}</td>
        <td>{price}</td>

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
            {platform.pc && <option value={pc}>{pc}</option>}
            {platform.xbox && <option value={xbox}>{xbox}</option>}
            {platform.playstation && <option value={playstation}>{playstation}</option>}
          </select>
        </td>
        <td>
          <button className={mainStyle.btn} type="button" onClick={onDeleteItem}>
            Delete item
          </button>
        </td>
      </tr>
    </tbody>
  );
};
export default CartTable;
