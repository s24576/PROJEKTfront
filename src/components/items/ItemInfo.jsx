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
    const { id, name, price } = item;
    const tempItem = cart.find((cartItem)=>cartItem.id === id);
    if(tempItem){
      const updatedCart = cart.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
        setCart(updatedCart);
    }
    else{
      setCart((prevCart) => [...prevCart, { id, name, price, quantity: quantity }]);
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
              style={{ maxWidth: '100px', maxHeight: '100px' }}
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
