// To manage the cartContext data and provide the data access to all required components.

import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // Add an item to the cart
  if (action.type === "ADD") {
    // A check for pre existence of iems in the cart befre adding them. If existed, update the number of item, price & totalAmount
    const cartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[cartIndex];
    let updatedItems;

    // if the case of same type items in cart prevailed.
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[cartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // Remove an item from the cart
  if (action.type === "REMOVE") {
    // reduce the number of items by 1, and remove the item from the cart upon reaching 0.
    const itemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[itemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // Empty the cart after an order.
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

// The cardcontext.provider wraps around the components in need of the props data. can also add the logic for managing the context data to

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
