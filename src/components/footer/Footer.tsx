import React, { FC } from "react";
import SonyLogo from "../../assets/images/sonyLogo.svg";
import UbisoftLogo from "../../assets/images/ubisoftLogo.svg";
import ValveLogo from "../../assets/images/valveLogo.svg";
import NintendoLogo from "../../assets/images/nintendoLogo.svg";
import style from "./footer.module.scss";

const Footer: FC = () => (
  <footer className={style.footer}>
    <span>Incredible convenient</span>
    <div className={style.list}>
      <div className={style.item}>
        <a href="https://www.sony.ru/">
          <img src={SonyLogo} alt="" />
        </a>
      </div>
      <div className={style.item}>
        <a href="https://www.nintendo.ru/">
          <img src={NintendoLogo} alt="" />
        </a>
      </div>
      <div className={style.item}>
        <a href="https://www.ubisoft.com/ru-ru/">
          <img src={UbisoftLogo} alt="" />
        </a>
      </div>
      <div className={style.item}>
        <a href="https://www.valvesoftware.com/ru/">
          <img src={ValveLogo} alt="" />
        </a>
      </div>
    </div>
    <span> © LoremIpsum, 2021-2022</span>
  </footer>
);

export default Footer;
