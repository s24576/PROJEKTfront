import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ItemsContext } from '../context/ItemsContext';
import CommentList from './CommentList';
import RatingList from './RatingList';

function ItemList() {
  const { items, setItems, fetchData } = useContext(ItemsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [setItems]);
  

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete("http://localhost:3001/api/item/delete",{
        params:{ itemId: itemId },
      } );
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const showOpinions = (id)=>{
    setSelectedItemId(id);
  }

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

  if(items.length===0){
    return <div>Lista przedmiotów jest pusta</div>
  }

  return (
    <div>
      <div>
        <h2>Lista przedmiotów</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name}
              <button onClick={() => handleDeleteItem(item._id)}>Usuń</button>
              <button onClick={() => showOpinions(item._id)}>Zarządzaj opiniami</button>
              {selectedItemId === item._id && (
              <div>
                <CommentList id={item._id} />
                <RatingList id={item._id} />
              </div>
            )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemList;