import React, { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => (
  <header className="header">
    <div className="header__logo">
      <a href="#!" className="header__logo-link">
        Game Store
      </a>
    </div>
    <Navbar />
  </header>
);

export default Header;
