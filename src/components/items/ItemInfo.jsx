import React, { useContext, useEffect, useReducer, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ItemsContext } from '../context/ItemsContext';
import Opinions from "../opinions/Opinions";

const quantityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUANTITY':
      return action.payload;
    case 'ADD_TO_CART':
      return 1;
    default:
      return state;
  }
};

function ItemInfo() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const { loading, setLoading } = useContext(ItemsContext);
  const { error, setError } = useContext(ItemsContext);
  const { cart, setCart, shippingAvalivable, setShippingAvalivable, } = useContext(ItemsContext);
  const [quantitySet, dispatch] = useReducer(quantityReducer, 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/item/byId", { params: { itemId: itemId } });
        setItem(response.data.item);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [itemId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>
      </div>
    );
  }

  const handleAdd = () => {
    const { _id, name, price, quantity, shipping1 } = item;

    if (!Number.isInteger(quantitySet) || quantitySet < 1 || quantitySet > item.quantity) {
      console.error("Invalid quantity. Please enter a valid positive number.");
      return;
    }

    if(shippingAvalivable){
      setShippingAvalivable(shipping1);
    }
    if(quantity>0){
      const tempItem = cart.find((cartItem) => cartItem.itemId === _id);
      if (tempItem) {
        if(tempItem.quantity + quantitySet<quantity){
          const updatedCart = cart.map((cartItem) =>
            cartItem.itemId === _id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
          );
          setCart(updatedCart);
        }
      } else {
        setCart((prevCart) => [...prevCart, { itemId: _id, name, price, quantity: quantitySet, maxQuantity: quantity, shipping1: shipping1 }]);
      }
    }

    dispatch({ type: 'ADD_TO_CART' });
  };

  return (
    <div className="container mx-auto p-4">
      {item && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="image-container">
              <img
                src={item.photo}
                alt={item.name}
                className="w-2/3 h-auto max-w-full max-h-full"
              />
            </div>
            <label htmlFor="quantitySet" className="text-lg mt-4">Ilość:</label>
            <div className="flex items-center">
              <input
                type="number"
                id="quantitySet"
                name="quantitySet"
                value={quantitySet}
                min={1}
                max={item.quantity}
                onChange={(e) => dispatch({ type: 'SET_QUANTITY', payload: parseInt(e.target.value, 10) })}
                className="w-16 border border-gray-400 p-2"
              />
              <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md">Dodaj do koszyka</button>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 flex flex-col justify-center items-center bg-white p-4 rounded-md shadow-md">
            <h4 className="text-xl font-bold">{item.name}</h4>
            <p className="price text-lg">Cena: {item.price}</p>
            <p className="text-lg">Opis: {item.description}</p>
            <p className="quantity text-lg">Ilość dostępna: {item.quantity}</p>

            <div className="mt-4">
              <h5 className="text-lg font-bold mb-2">Opcje dostawy:</h5>
              <div className="mx-auto p-4 flex">
                <div className="w-auto text-lg text-gray-70">
                  Paczkomat {item.shipping1 ? <FaCheck color='green' /> : 'Niedostępny'}
                </div>
              </div>
              <div className="mx-auto p-4 flex">
                <div className="w-auto text-lg text-gray-70">
                  Kurier {item.shipping2 ? <FaCheck color='green' /> : 'Niedostępny'}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2">
            <div className="mt-4">
              <Opinions id={item._id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemInfo;
