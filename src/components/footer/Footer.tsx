import React, { FC } from "react";
import SonyLogo from "../../assets/images/sonyLogo.svg";
import UbisoftLogo from "../../assets/images/ubisoftLogo.svg";
import ValveLogo from "../../assets/images/valveLogo.svg";
import NintendoLogo from "../../assets/images/nintendoLogo.svg";

export interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="footer">
    <span className="footer__title">Incredible convenient</span>
    <div className="company__list">
      <div className="company__item">
        <a href="https://www.sony.ru/" className="company__item-list">
          <img src={SonyLogo} alt="" />
        </a>
      </div>
      <div className="company__item">
        <a href="https://www.nintendo.ru/" className="company__item-list">
          <img src={NintendoLogo} alt="" />
        </a>
      </div>
      <div className="company__item">
        <a href="https://www.ubisoft.com/ru-ru/" className="company__item-list">
          <img src={UbisoftLogo} alt="" />
        </a>
      </div>
      <div className="company__item">
        <a href="https://www.valvesoftware.com/ru/" className="company__item-list">
          <img src={ValveLogo} alt="" />
        </a>
      </div>
    </div>
    <span className="footer__copyright"> © LoremIpsum, 2021-2022</span>
  </footer>
);

export default Footer;
