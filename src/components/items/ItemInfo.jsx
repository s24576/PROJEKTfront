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
  const [addToCartError, setAddToCartError] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

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

  useEffect(() => {
    if (addToCartSuccess || addToCartError) {
      const timeout = setTimeout(() => {
        setAddToCartSuccess(false);
        setAddToCartError(false);
      }, 2000);
  
      return () => clearTimeout(timeout);
    }
  }, [addToCartSuccess, addToCartError]);  

  const handleAdd = () => {
    const { _id, name, price, quantity, shipping1 } = item;

    if (!Number.isInteger(quantitySet) || quantitySet < 1 || quantitySet > item.quantity) {
      setAddToCartError("Niepoprawna ilość.");
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
    setAddToCartError('');
    setAddToCartSuccess(true);
  };

  return (
    <div className="container mx-auto flex-grow p-4 flex flex-col justify-center items-center">
      {addToCartError && (
        <div className="text-red-500 mt-2 px-4 py-4 bg-white">{addToCartError}</div>
      )}
      {addToCartSuccess && (
        <div className="text-green-500 mt-2 px-4 py-4 bg-white">Przedmiot został dodany do koszyka.</div>
      )}

      {item && (
        <div className="w-auto bg-white p-4 rounded-md shadow-md text-center">
          <h4 className="text-xl font-bold">{item.name}</h4>
          <img
            src={item.photo}
            alt={item.name}
            className="image-container w-auto h-1/2 mx-auto"
          />
          <p className="price text-lg">Cena: {item.price}</p>
          <p className="text-lg">Opis: {item.description}</p>
          <p className="quantity text-lg">Ilość dostępna: {item.quantity}</p>

          <div className="mt-4">
            <h5 className="text-lg font-bold mb-2">Opcje dostawy:</h5>
            <div className="flex justify-center">
              <div className="text-lg text-gray-700 flex items-center">
                Paczkomat {item.shipping1 ? <FaCheck color='green' /> : 'Niedostępny'}
              </div>
              <div className="text-lg text-gray-700 flex items-center ml-4">
                Kurier {item.shipping2 ? <FaCheck color='green' /> : 'Niedostępny'}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="quantitySet" className="text-lg">Ilość:</label>
            <div className="flex items-center">
              <input
                type="number"
                id="quantitySet"
                name="quantitySet"
                value={quantitySet}
                min={1}
                max={item.quantity}
                onChange={(e) => dispatch({ type: 'SET_QUANTITY', payload: parseInt(e.target.value, 10) })}
                className="w-16 border border-gray-400 p-2 mr-2"
              />
              <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 rounded-md">Dodaj do koszyka</button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 w-full md:w-2/3 lg:w-1/2">
        {item && (
          <Opinions id={item._id} />
        )}
      </div>
    </div>
  );
}

export default ItemInfo;
