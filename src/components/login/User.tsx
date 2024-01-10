import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const User: React.FC = () => {
  const { userId } = useParams();
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orderHistory.length === 0 ? (
        <div>Brak zamówień w historii</div>
      ) : (
        <div>
          <h2>Historia zamówień</h2>
          <ul>
            {orderHistory.map((order) => (
              <li key={order._id}>
                <p>Zamówienia: {order._id}</p>
                <Link to={`/order/${order._id}`}>
                  <button>Szczegóły</button>
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
