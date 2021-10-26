import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import BuggyButton from "../../components/error-boundary/BuggyButton";
import style from "../../styles/main.module.css";

const HomePage: FC = () => (
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
