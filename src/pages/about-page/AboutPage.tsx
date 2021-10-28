import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import BuggyButton from "../../components/error-boundary/BuggyButton";
import style from "../../styles/main.module.css";

const AboutPage: FC = () => (
  <>
    <Header />
    <div className={style.content}>
      <span className={style.title}>About Page</span>
      <div>
        <br />
        <ErrorBoundary>
          <BuggyButton />
        </ErrorBoundary>
      </div>
    </div>

    <Footer />
  </>
);

export default AboutPage;
