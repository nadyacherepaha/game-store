import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <div>
    <Header />
    <div className="content">
      <span className="content__title">Best Games Market</span>
    </div>
    <Footer />
  </div>
);

export default HomePage;
