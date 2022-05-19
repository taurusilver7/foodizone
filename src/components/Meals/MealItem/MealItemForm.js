import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItem.module.css";

const MealItemForm = ({ id, onAddToCart }) => {
  const [validAmount, setValidAmount] = useState(true);
  const amountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const amount = amountRef.current.value;
    const enteredAmount = +amount;

    if (amount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setValidAmount(false);
      return;
    }
    onAddToCart(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
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
      {!validAmount && <p>Please enter a valid number (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
