import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  const [checkOut, setCheckOut] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx?.totalAmount.toFixed(2)}`;

  // A check for cart item existence. The order button only displays on items in cart.
  const hasItems = cartCtx?.items.length > 0;

  // context fns to modify the items
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckOut(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx?.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button onClick={onClose} className={classes["button-alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={onClose}>
      {checkOut ? (
        <Checkout onClose={onClose} totalAmount={totalAmount} />
      ) : (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
            {!checkOut && modalAction}
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
