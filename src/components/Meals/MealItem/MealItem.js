import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ name, description, price, id }) => {
  const cost = `$${price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{cost}</div>
      </div>

      {/* Meal form markup */}
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;
