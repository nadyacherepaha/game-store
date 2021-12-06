import React, { FC, useEffect } from "react";
import classNames from "classnames";
import style from "../../styles/main.module.css";
import cartStyle from "./cart.module.scss";
import titleStyle from "../../components/categories/categories.module.scss";
import { ICard } from "../../types/Card";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import getQuantity from "../../redux/selectors/cartSelectors";
import CartItem from "./CartItem";
import cartSlice from "../../redux/reducers/cartReducer";

export interface ICartProps extends ICard {}

const Cart: FC<ICartProps> = () => {
  const { itemInCart, cartTotalAmount, cartTotalQuantity } = useAppSelector(getQuantity);
  const cart = useAppSelector(getQuantity);
  const { clearCart, getTotals } = cartSlice.actions;
  const dispatch = useAppDispatch();
  const currentDate = new Date().toDateString();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const totalItemPrice = (price: number, amount: number) => Number(price * amount).toFixed(2);

  const onClickBuyProducts = () => {
    if (window.confirm("Are you sure you want to buy?")) {
      return dispatch(clearCart());
    }
  };

  return (
    <div className={classNames(cartStyle.cart, cartStyle.bgCart)}>
      <div className={classNames(cartStyle.content, style.content, style.shadowContainer)}>
        {itemInCart.length > 0 ? (
          <>
            <div className={titleStyle.title}>
              <p>Cart page</p>
            </div>
            <div className={cartStyle.table}>
              <div className={cartStyle.header}>
                <h3>Name</h3>
                <h3>Price</h3>
                <h3>Amount</h3>
                <h3>Qauntity</h3>
                <h3>Date</h3>
                <h3>Platform</h3>
              </div>

              {itemInCart.map((result) => (
                <CartItem key={result.id} currentDate={currentDate} totalItemPrice={totalItemPrice} {...result} />
              ))}
            </div>
            <div className={cartStyle.totals}>
              <span>Total amount: {cartTotalAmount.toFixed(2)}$</span>
              <span>Total number of products: {cartTotalQuantity}</span>
              <button className={style.btn} type="button" onClick={onClickBuyProducts}>
                Buy
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={cartStyle.title}>Your basket is empty</h2>
            <img
              className={cartStyle.img}
              src="https://olsi-trade.ru/local/templates/olsi/img/icon/empty-basket.svg"
              alt="empty basket"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
