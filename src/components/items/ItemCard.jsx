import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";

function ItemCards({ item }) {
  const { cart, setCart } = useContext(ItemsContext);
  const navigate = useNavigate();
  const shortDesc = item.description.split(".")[0];

  const handleRedirect = () => {
    const address = "/info/" + item._id;
    navigate(address);
  };

  const handleAdd = () => {
    const { id, name, price } = item;
    const tempItem = cart.find((cartItem) => cartItem.id === id);
    if (tempItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { id, name, price, quantity: 1 }]);
    }
  };

  return (
    <div className="itemCard">
      <div className="itemImage">
        <img
          src={item.photo}
          alt={item.name}
          style={{ width: 'auto', height: '200px' }}
        />
        
      </div>
      <div className="itemDetails">
        <h4>{item.name}</h4>
        <div className="price"><p>Cena: {item.price}</p></div>
        <p>Opis: {shortDesc}</p>
        <p>Ilość: {item.quantity}</p>
      </div>
      <div className="cardButtons">
        <button onClick={handleRedirect}>Szczegóły</button>
        <button onClick={handleAdd}>Dodaj do koszyka</button>
      </div>
    </div>
  );
}

export default ItemCards;
