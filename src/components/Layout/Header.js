import React from "react";

import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";

const Header = ({ onShowCart }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>FoodiZone</h1>
        <HeaderButton onClick={onShowCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="banner_img" />
      </div>
    </>
  );
};

export default Header;
