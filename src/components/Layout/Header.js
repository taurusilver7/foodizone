import React from "react";

import mealsImg from "../../assets/meals.jpg"
import classes from "./Header.module.css"

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>FoodZone</h1>
        <button>Cart</button>
      </header>

      <div className={classes['main-image']}>
        <img src={mealsImg} alt="banner_img" />
      </div>
    </>
  );
};

export default Header;
