import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./Header.module.css";

const HeaderButton = ({ onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderButton;
