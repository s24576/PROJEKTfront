import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Order(){
    const {orderId} = useParams();
    const [order, setOrder]= useState(null);
    const [shipping, setShipping]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get("http://localhost:3001/api/order/byId",
                {params:{orderId: orderId}});
                setOrder(response.data.order);
                setShipping(response.data.shipping);
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
        
    }, [orderId]);

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
            <h2>Zamówienie</h2>
            <h4>{order._id}</h4>
            <h3>Dostawa:</h3>
            <p>{shipping.type}</p>
            <h3>Kupione przedmioty:</h3>
            <ul>
            {order.items.map((item) => (
              <li key={item.itemId}>
                <p>Nazwa: {item.name}</p>
                <p>Cena: {item.price}</p>
                <p>Ilość: {item.quantity}</p>
              </li>
            ))}
            </ul>
        </div>
    );
}

export default Order;