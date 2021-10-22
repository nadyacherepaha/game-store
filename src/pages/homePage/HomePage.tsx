import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import BuggyButton from "../../components/errorBoundary/BuggyButton";
import style from "../../styles/main.module.css";

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <div>
    <Header />
    <div className={style.content}>
      <span className={style.title}>Best Games Market</span>
      <div>
        <br />
        <ErrorBoundary>
          <BuggyButton />
        </ErrorBoundary>
      </div>
    </div>
    <Footer />
  </div>
);

export default HomePage;
