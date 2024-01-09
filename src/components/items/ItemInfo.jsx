import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ItemsContext } from '../context/ItemsContext';
import Opinions from "../opinions/Opinions";

const quantityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUANTITY':
      return action.payload;
    default:
      return state;
  }
};


function ItemInfo() {
  const {itemId} = useParams();
  const [item, setItem] = useState(null);
  const {loading, setLoading} = useContext(ItemsContext);
  const {error, setError} = useContext(ItemsContext);
  const { cart, setCart } = useContext(ItemsContext);
  const [quantity, dispatch] = useReducer(quantityReducer, 1);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await axios.get("http://localhost:3001/api/item/byId",{params:{itemId: itemId}});
        setItem(response.data.item);
        setLoading(false);
      }
      catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [itemId]);

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


  const handleAdd = () => {
    const { _id, name, price } = item;

    if (!Number.isInteger(quantity) || quantity < 1 || quantity>item.quantity) {
      console.error("Invalid quantity. Please enter a valid positive number.");
      return;
    }
    
    const tempItem = cart.find((cartItem)=>cartItem.itemId === _id);
    if(tempItem){
      const updatedCart = cart.map((cartItem) =>
            cartItem.itemId === _id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
        setCart(updatedCart);
    }
    else{
      setCart((prevCart) => [...prevCart, { itemId: _id, name, price, quantity: quantity }]);
    } 
  };

  return (
    <div>
      {item && (
        <div>
          <div>
            <img
              src={item.photo}
              alt={item.name}
              style={{ height: 'auto', width: 'auto', maxWidth: '100%', maxHeight: '100%' }}
            />
            <h4>{item.name}</h4>
            <p>Cena: {item.price}zł</p>
            <p>Opis: {item.description}</p>
            <p>Ilość: {item.quantity}</p>
          </div>
  
          <div>
            <label htmlFor="quantity">Ilość:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min={1}
              max={item.quantity}
              onChange={(e) => dispatch({ type: 'SET_QUANTITY', payload: parseInt(e.target.value, 10) })}
            />
            <button onClick={handleAdd}>Dodaj do koszyka</button>
          </div>
  
          <div>
            <h5>Opcje dostawy</h5>
            <p>Paczkomat: {item.shipping1 ? 'Dostępny' : 'Niedostępny'}</p>
            <p>Kurier: {item.shipping2 ? 'Dostępny' : 'Niedostępny'}</p>
          </div>
  
          <div>
            <Opinions id={item._id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemInfo;
