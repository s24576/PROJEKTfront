import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";

const ShortItem = ({ item }) => {
  const { cart, setCart, shippingAvalivable, setShippingAvalivable, } = useContext(ItemsContext);

  const handleAdd = () => {
    const updatedCart = cart.map(cartItem =>
      cartItem.itemId === item.itemId && cartItem.quantity < cartItem.maxQuantity
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    setCart(updatedCart);
  };

  const handleSubtract = () => {
    const updatedCart = cart.map(cartItem =>
      cartItem.itemId === item.itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

    setCart(updatedCart);
  };

  const handleRemove = () => {
    const updatedCart = cart.filter(cartItem => cartItem.itemId !== item.itemId);
  
    const isShippingAvailable = updatedCart.some(cartItem => !cartItem.shipping1);
    setShippingAvalivable(!isShippingAvailable);

    setCart(updatedCart);
  };

  return (
    <div className="border p-4 mb-4 rounded-md bg-white">
      <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
      <div className="flex items-center">
        <button
          className="bg-gray-200 px-2 py-1 rounded-md mr-2"
          onClick={handleSubtract}
        >
          -
        </button>
        <p className="quantity text-xl">{item.quantity}</p>
        <button
          className="bg-gray-200 px-2 py-1 rounded-md ml-2"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
      <button
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        onClick={handleRemove}
      >
        Usuń przedmiot
      </button>
    </div>
  );
};

export default ShortItem;