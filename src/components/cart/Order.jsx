import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Order() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/order/byId", {
          params: { orderId: orderId },
        });
        setOrder(response.data.order);
        setShipping(response.data.shipping);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) {
    return <div className="text-center mt-8 text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Zamówienie</h2>
      <h4 className="text-lg font-semibold mb-2">{order._id}</h4>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Dostawa:</h3>
        <p className="mb-2">
          <span className="font-semibold">Typ:</span> {shipping.type}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Imię:</span> {shipping.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Nazwisko:</span> {shipping.surname}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {shipping.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Adres:</span> {shipping.address}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Kod pocztowy:</span> {shipping.postalcode}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Miasto:</span> {shipping.city}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Numer telefonu:</span> {shipping.number}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Numer paczkomatu:</span> {shipping.code}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Kupione przedmioty:</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.itemId} className="mb-4">
              <p>
                <span className="font-semibold">Nazwa:</span> {item.name}
              </p>
              <p className="price">
                <span className="font-semibold">Cena:</span> {item.price}
              </p>
              <p className="quantity">
                <span className="font-semibold">Ilość:</span> {item.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Order;
