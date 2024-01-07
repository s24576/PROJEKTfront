import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Order(){
    const {orderId} = useParams;
    const [order, setOrder]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get("http://localhost:3001/api/get/order",
                {params:{orderId: orderId}});
                setOrder(response.data.order);
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
    })

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
            <h4>{order._Id}</h4>
        </div>
    );
}

export default Order;