import React, { FC } from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import BuggyButton from "../../components/error-boundary/BuggyButton";
import style from "../../styles/main.module.css";

const AboutPage: FC = () => (
  <div className={style.content}>
    <span className={style.title}>About Page</span>
    <div>
      <br />
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
    </div>
  </div>
);

export default AboutPage;
