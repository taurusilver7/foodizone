import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

const MealItem = ({ name, description, price, id }) => {
  const cartCtx = useContext(CartContext);

  const cost = `₹${price.toFixed(2)}`;

  const addCartHandler = (amount) => {
    cartCtx?.addItem({
      id,
      name,
      amount,
      price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{cost}</div>
      </div>

      {/* Meal form markup */}
      <div>
        <MealItemForm onAddToCart={addCartHandler} id={id} />
      </div>
    </li>
  );
};

export default MealItem;
