import React from "react";
import classes from "./Checkout.module.css";

const Checkout = ({ onClose, totalAmount }) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
