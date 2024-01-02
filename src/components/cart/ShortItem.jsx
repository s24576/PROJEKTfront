import React, { useContext, useReducer } from "react";
import { ItemsContext } from "../context/ItemsContext";

const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const REMOVE_ITEM = "REMOVE_ITEM";

const cartReducer = (state, action) => {
  switch (action.type) {
    case INCREASE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.itemId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case DECREASE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.itemId);
    default:
      return state;
  }
};

function ShortItem({ item }) {
  const { cart, setCart } = useContext(ItemsContext);

  const [state, dispatch] = useReducer(cartReducer, cart);

  const handleAdd = (itemId) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: {
        itemId,
      },
    });
  };

  const handleSubtract = (itemId) => {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: {
        itemId,
      },
    });
  };

  const handleRemove = (itemId) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: {
        itemId,
      },
    });
  };

  setCart(state);

  return (
    <div>
      <h4>{item.name}</h4>
      <button onClick={() => handleSubtract(item.id)}>-</button>
      <p>{item.quantity}</p>
      <button onClick={() => handleAdd(item.id)}>+</button>
      <button onClick={() => handleRemove(item.id)}>Usuń przedmiot</button>
    </div>
  );
}

export default ShortItem;
