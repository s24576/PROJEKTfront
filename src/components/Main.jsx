import React, { useContext } from "react";
import ItemCard from "./items/ItemCard";
import { ItemsContext } from "./context/ItemsContext";

function Main() {
  const {items} = useContext(ItemsContext);
  const {loading} = useContext(ItemsContext);
  const {error} = useContext(ItemsContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default Main;
