import React, { FC } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import style from "../../styles/main.module.css";

export interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => (
  <div>
    <Header />
    <div className={style.content}>
      <span className={style.title}>About Page</span>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
