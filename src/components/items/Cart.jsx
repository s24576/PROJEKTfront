import React, { useContext, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";

function Cart() {
  const { cart, setCart } = useContext(ItemsContext);

  return <div></div>;
}

export default Cart;
