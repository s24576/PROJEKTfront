import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";
import ShortItem from "./ShortItem";

function Cart() {
  const { cart } = useContext(ItemsContext);

  if(cart.length===0){
    return(
      <div>Koszyk jest pusty</div>
    );
  }

  return (
    <div>
      {cart.map((item)=>(
        <ShortItem key={item._id} item={item}/>
      ))}
      <Link to="/shipping">
        <button>Dostawa</button>
      </Link>
    </div>
  );
}

export default Cart;
