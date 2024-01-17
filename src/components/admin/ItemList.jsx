import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ItemsContext } from '../context/ItemsContext';
import EditItem from './EditItem';

function ItemList() {
  const { items, setItems, fetchData } = useContext(ItemsContext);
  const [editItem ,setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [setItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete('http://localhost:3001/api/item/delete', {
        params: { itemId: itemId },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const showOpinions = (id) => {
    const address = `/info/${id}`;
    navigate(address);
  };

  const handleEditItem = (id) => {
    setEditItem(id);
  };

  const handleEndEdit = () => {
    setEditItem(null);
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-center mt-4">Lista przedmiotów jest pusta</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lista przedmiotów</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-2 border-b py-2 flex items-center justify-between">
            <span className="text-lg">{item.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Usuń
              </button>
              <button
                onClick={() => showOpinions(item._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Zarządzaj opiniami
              </button>
              <button
                onClick={() => handleEditItem(item._id)}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Edytuj
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editItem && <EditItem id={editItem} onResetEdit={handleEndEdit} />}
    </div>
  );
}

export default ItemList;
