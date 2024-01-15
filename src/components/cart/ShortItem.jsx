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
  const { setCart } = useContext(ItemsContext);

  const [state, dispatch] = useReducer(cartReducer, [item]);

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
    <div className="border p-4 mb-4 rounded-md">
      <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
      <div className="flex items-center">
        <button
          className="bg-gray-200 px-2 py-1 rounded-md mr-2"
          onClick={() => handleSubtract(item.id)}
        >
          -
        </button>
        <p className="text-xl">{item.quantity}</p>
        <button
          className="bg-gray-200 px-2 py-1 rounded-md ml-2"
          onClick={() => handleAdd(item.id)}
        >
          +
        </button>
      </div>
      <button
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        onClick={() => handleRemove(item.id)}
      >
        Usuń przedmiot
      </button>
    </div>
  );
}

export default ShortItem;
