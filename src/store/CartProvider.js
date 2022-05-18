// To manage the cartContext data and provide the data access to all required components.

import React from "react";
import CartContext from "./CartContext";

// The cardcontext.provider wraps around the components in need of the props data. can also add the logic for managing the context data to

const CartProvider = (props) => {
  const addItemHandler = (item) => {};

  const removeItemHandler = () => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider values={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
