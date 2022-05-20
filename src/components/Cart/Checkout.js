import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Validation helper functions
const isEmpty = (value) => value.trim() === "";
const isPostalCode = (value) => value.trim().length !== 5;

const Checkout = ({ onClose, totalAmount, onConfirm }) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const enteredName = !isEmpty(name);
    const enteredStreet = !isEmpty(street);
    const enteredCity = !isEmpty(city);
    const enteredPostal = !isPostalCode(postal);

    setFormValidity({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });

    const formValid =
      enteredName && enteredStreet && enteredCity && enteredPostal;

    if (!formValid) {
      return;
    }

    // Submit card data.
    onConfirm({
      name,
      street,
      city,
      postal,
    });
  };

  const controlName = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const controlStreet = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const controlPostal = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const controlCity = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;
  return (
    <form>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={controlName}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formValidity.name && <p>Please Enter a Valid name!</p>}
      </div>
      <div className={controlStreet}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formValidity.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={controlPostal}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formValidity.postal && <p>Please Enter a Valid postal code!</p>}
      </div>
      <div className={controlCity}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formValidity.city && <p>Please Enter a Valid City!</p>}
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
