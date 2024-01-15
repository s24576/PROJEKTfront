import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";
import ShortItem from "./ShortItem";

function Cart() {
  const { cart, setCart } = useContext(ItemsContext);
  const [subtotal, setSubtotal] = useState(0);

  const countSubtotal = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.quantity !== null && item.quantity > 0) total += item.price * item.quantity;
    });
    setSubtotal(total);
  };

  useEffect(() => {
    countSubtotal();
  }, [cart]);

  if (cart.length === 0) {
    return <div className="text-center mt-4">Koszyk jest pusty</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Koszyk:</h3>
      {cart.map((item) => (
        <ShortItem key={item._id} item={item} />
      ))}
      <div className="mt-4">
        <p className="text-xl font-semibold">Suma: {subtotal.toFixed(2)}zł + dostawa</p>
      </div>
      <Link to="/shipping">
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700">
          Dostawa
        </button>
      </Link>
    </div>
  );
}

export default Cart;
