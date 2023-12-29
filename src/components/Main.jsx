import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./items/ItemCard";
import { ItemsContext } from "./context/ItemsContext";

function Main() {
  const { items, setItems } = useContext(ItemsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/get/items");
        setItems(response.data.items);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [setItems]);

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
