import React, { FC } from "react";
import classNames from "classnames";
import style from "../../styles/main.module.css";
import cartStyle from "./cart.module.scss";
import { Card } from "../../types/Card";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import getQuantity from "../../redux/selectors/cartSelectors";
import CartTable from "./CartTable";
import { clearCart } from "@/redux/reducers/cartReducer";

export interface ICartProps extends Card {}

const Cart: FC<ICartProps> = () => {
  const { itemInCart } = useAppSelector(getQuantity);
  const dispatch = useAppDispatch();
  const date = new Date();
  const dateToString = date.toDateString();

  const calcTotalPrice = (price: Card[]) => {
    const totalPrice = price.reduce((acc, item) => (acc += item.price), 0);

    return totalPrice.toFixed(2);
  };

  const buyProducts = () => {
    if (window.confirm("Are you sure you want to buy?")) {
      return dispatch(clearCart());
    }
  };

  return (
    <div className={classNames(cartStyle.cart, cartStyle.bgCart)}>
      <div className={classNames(cartStyle.content, style.content, style.shadowContainer)}>
        {itemInCart.length > 0 ? (
          <>
            <table className={cartStyle.table}>
              <thead className={style.header}>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Platform</th>
                </tr>
              </thead>

              {itemInCart.map(({ ...result }) => (
                <CartTable key={result.id} dateToString={dateToString} {...result} />
              ))}
            </table>
            <p>Total price: {calcTotalPrice(itemInCart)}</p>
            <button className={style.btn} type="button" onClick={buyProducts}>
              Buy
            </button>
          </>
        ) : (
          <>
            <h2 className={cartStyle.title}>Your basket is empty</h2>
            <img
              className={cartStyle.img}
              src="https://olsi-trade.ru/local/templates/olsi/img/icon/empty-basket.svg"
              alt=""
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
