import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItem.module.css";

const MealItemForm = ({ id }) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={classes.button}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
