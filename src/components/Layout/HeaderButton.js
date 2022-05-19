import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderButton = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const cartItems = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;

  // animate the button with every item added to cart.
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlight(true);
    // set timer to cancel the animation to restrat in 300ms
    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);

    // cleanup fn for useEffect
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderButton;
