import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
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

  const submitHandler = async (userData) => {
    const orderToast = toast.loading("Ordering...");
    const response = await fetch(
      "https://foodizone-d0523-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx?.items,
        }),
      }
    );

    toast.success("Order Successful!", {
      id: orderToast,
    });
    setSubmitted(true);
    cartCtx.clearCart();
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
      <button onClick={onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const orderStatus = checkOut ? (
    <Checkout
      onClose={onClose}
      onConfirm={submitHandler}
      totalAmount={totalAmount}
    />
  ) : (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
        {!checkOut && modalAction}
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      {submitted ? (
        <>
          <p>Order placed. Please wait while we prepare your order!</p>
          <div className={classes.actions}>
            <button onClick={onClose} className={classes["button--alt"]}>
              Close
            </button>
          </div>
        </>
      ) : (
        orderStatus
      )}
    </Modal>
  );
};

export default Cart;
