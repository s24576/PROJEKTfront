import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/item/all');
      setItems(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.response) {
        setError(error.response.data.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setItems]);

  return (
    <ItemsContext.Provider value={{
      item, setItem,
      items, setItems, fetchData,
      cart, setCart,
      delivery, setDelivery,
      loading, setLoading,
      error, setError }}>
      {children}
    </ItemsContext.Provider>
  );
};
