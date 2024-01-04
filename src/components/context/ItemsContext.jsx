import React, { useState } from 'react';

export const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(null);
  return (
    <ItemsContext.Provider value={{ items, setItems, item, setItem, cart, setCart, delivery, setDelivery }}>
      {children}
    </ItemsContext.Provider>
  );
};
