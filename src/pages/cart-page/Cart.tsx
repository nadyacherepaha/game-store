import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import style from "../../styles/main.module.css";

const Cart: FC = () => (
  <>
    <Header />
    <div className={style.content}>
      <span className={style.title}>Cart Page</span>
    </div>
    <Footer />
  </>
);

export default Cart;
