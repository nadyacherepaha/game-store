import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import style from "../../styles/main.module.css";

const Products: FC = () => (
  <div>
    <Header />
    <div className={style.content}>
      <span className={style.title}>Product Page</span>
    </div>
    <Footer />
  </div>
);

export default Products;
