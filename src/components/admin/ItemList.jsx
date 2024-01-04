import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ItemsContext } from '../context/ItemsContext';


function ItemList() {
  const { items, setItems } = useContext(ItemsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get/items');
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
      <div>
        <h2>Lista przedmiotów</h2>
        <ul>
          {items.map(item => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemList;