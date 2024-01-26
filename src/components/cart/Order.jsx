import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload.order,
        shipping: action.payload.shipping,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_TOTAL_COST":
      return {
        ...state,
        totalCost: action.payload,
      };
    default:
      return state;
  }
};

function Order() {
  const { orderId } = useParams();
  const [state, dispatch] = useReducer(orderReducer, {
    order: null,
    shipping: null,
    loading: true,
    error: null,
    totalCost: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/order/byId", {
          params: { orderId: orderId },
        });

        dispatch({
          type: "SET_ORDER",
          payload: {
            order: response.data.order,
            shipping: response.data.shipping,
          },
        });

        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        if (error.response) {
          dispatch({ type: "SET_ERROR", payload: error.response.data.message });
        }
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [orderId]);

  useEffect(() => {
    if (state.order && state.order.items) {
      const totalCost = state.order.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
  
      let shippingCost = 0;
      if (state.shipping && state.shipping.type === "shipping2") {
        shippingCost = 20;
      } else {
        shippingCost = 10;
      }
  
      const grandTotal = totalCost + shippingCost;
  
      dispatch({
        type: "SET_TOTAL_COST",
        payload: grandTotal,
      });
    }
  }, [state.order, state.shipping]);

  if (state.loading) {
    return <div className="text-center mt-8 text-xl">Loading...</div>;
  }
  if (state.error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{state.error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Zamówienie</h2>
      <h4 className="text-lg font-semibold mb-2">{state.order._id}</h4>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Dostawa:</h3>
        {state.shipping && (
          <div>
            {state.shipping.type && (
              <p className="mb-2">
                <span className="font-semibold">Typ:</span> {state.shipping.type}
              </p>
            )}
            {state.shipping.name && (
              <p className="mb-2">
                <span className="font-semibold">Imię:</span> {state.shipping.name}
              </p>
            )}
            {state.shipping.surname && (
              <p className="mb-2">
                <span className="font-semibold">Nazwisko:</span> {state.shipping.surname}
              </p>
            )}
            {state.shipping.email && (
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {state.shipping.email}
              </p>
            )}
            {state.shipping.address && (
              <p className="mb-2">
                <span className="font-semibold">Adres:</span> {state.shipping.address}
              </p>
            )}
            {state.shipping.postalcode && (
              <p className="mb-2">
                <span className="font-semibold">Kod pocztowy:</span> {state.shipping.postalcode}
              </p>
            )}
            {state.shipping.city && (
              <p className="mb-2">
                <span className="font-semibold">Miasto:</span> {state.shipping.city}
              </p>
            )}
            {state.shipping.number && (
              <p className="mb-2">
                <span className="font-semibold">Numer telefonu:</span> {state.shipping.number}
              </p>
            )}
            {state.shipping.code && (
              <p className="mb-2">
                <span className="font-semibold">Numer paczkomatu:</span> {state.shipping.code}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Kupione przedmioty:</h3>
        <ul>
          {state.order.items.map((item) => (
            <li key={item.itemId} className="mb-4">
              {item.name && (
                <p>
                  <span className="font-semibold">Nazwa:</span> {item.name}
                </p>
              )}
              {item.price && (
                <p className="price">
                  <span className="font-semibold">Cena:</span> {item.price}
                </p>
              )}
              {item.quantity && (
                <p className="quantity">
                  <span className="font-semibold">Ilość:</span> {item.quantity}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Suma zamówienia:</h3>
          <p className="font-semibold text-lg price">{state.totalCost}</p>
        </div>
      </div>
    </div>
  );
}

export default Order;