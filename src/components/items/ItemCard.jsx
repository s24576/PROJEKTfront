import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";
import ShippingPrice from "./ShippingPrice";

function ItemCards({ item }) {
  const { cart, setCart, shippingAvalivable, setShippingAvalivable, } = useContext(ItemsContext);
  const navigate = useNavigate();
  const shortDesc = item.description.split(".")[0];
  const [isHovered, setIsHovered] = useState(false);

  const handleRedirect = () => {
    const address = "/info/" + item._id;
    navigate(address);
  };

  const handleAdd = () => {
    const { _id, name, price, shipping1 } = item;
    const tempItem = cart.find((cartItem) => cartItem.itemId === _id);

    if(shippingAvalivable){
      setShippingAvalivable(shipping1);
    }

    if (tempItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.itemId === _id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { itemId: _id, name, price, quantity: 1, shipping1: shipping1 }]);
    }
  };
  
  return (
    <div
      className="bg-white rounded-md shadow-md p-4 mb-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center mb-4">
        <img
          src={item.photo}
          alt={item.name}
          className="w-auto h-40 object-contain"
        />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
        <ShippingPrice
          price={item.price}
          shipping1={item.shipping1}
          shipping2={item.shipping2}
        />
        <p className="text-sm">Opis: {shortDesc}</p>
        <p className="quantity text-sm">Ilość: {item.quantity}</p>
      </div>
      {isHovered && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
            onClick={handleRedirect}
          >
            Szczegóły
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAdd}
          >
            Dodaj do koszyka
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemCards;
