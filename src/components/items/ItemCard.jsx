import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";


function ItemCards({ item }) {
  const { setItem } = useContext(ItemsContext);
  const { setCart } = useContext(ItemsContext);
  const navigate = useNavigate();
  const shortDesc = item.description.split(".")[0];

  const handleRedirect = () => {
    setItem(item);
    navigate("/info");
  };

  const handleAdd = () => {
    const { id, name } = item;
    setCart((prevCart) => [...prevCart, { id, name, quantity: 1}]);
  };

  return (
    <div>
      <img
        src={item.photo}
        alt={item.name}
        style={{ maxWidth: "100px", maxHeight: "100px" }}
      />
      <h4>{item.name}</h4>
      <p>Cena: {item.price}zł</p>
      <p>Opis: {shortDesc}</p>
      <p>Ilość: {item.quantity}</p>
      <button onClick={handleRedirect}>Szczegóły</button>
      <button onClick={handleAdd}>Dodaj do koszyka</button>
    </div>
  );
}

export default ItemCards;
