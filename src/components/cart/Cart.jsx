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
      if(item.quantity !== null && item.quantity > 0)
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  };

  useEffect(() => {
    countSubtotal();
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div>Koszyk jest pusty</div>
    );
  }

  return (
    <div>
      {cart.map((item) => (
        <ShortItem key={item._id} item={item} />
      ))}
      <div>
        <p>Suma: {subtotal}zł+dostawa</p>
      </div>
      <Link to="/shipping">
        <button>Dostawa</button>
      </Link>
    </div>
  );
}

export default Cart;
