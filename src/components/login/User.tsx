import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import axios from 'axios';


const User: React.FC = () => {
  const { userId } = useParams();
  const user = useContext(UserContext);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/order/byUser', {
          params: {
            userId: userId,
          },
        });

        setOrderHistory(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      {orderHistory.length === 0 ? (
        <div className="text-center">Brak zamówień w historii</div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Historia zamówień</h2>
          <ul>
            {orderHistory.map((order) => (
              <li key={order._id} className="flex items-center mb-4">
                <p className="font-semibold mr-4">Zamówienie: {order._id}</p>
                <Link to={`/order/${order._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Szczegóły</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
