import React, { FunctionComponent } from "react";
import Header from "../../components/header/Header";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => (
  <div>
    <Header />
    <h2>Best Games Market</h2>
  </div>
);

export default HomePage;
