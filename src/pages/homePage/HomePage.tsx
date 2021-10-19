import React, { FunctionComponent } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => (
  <div>
    <Header />
    <div className="content">
      <span className="content__title">Best Games Market</span>
    </div>
    <Footer />
  </div>
);

export default HomePage;
