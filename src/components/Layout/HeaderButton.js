import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./Header.module.css";

const HeaderButton = () => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderButton;
