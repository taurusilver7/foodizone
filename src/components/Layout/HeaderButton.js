import React, { useContext } from "react";
import classes from "./Header.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderButton = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItems = cartCtx?.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderButton;
