import React, { useContext, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import FormS1 from "./FormS1";
import FormS2 from "./FormS2";

function Shipping() {
  const { cart, shippingAvalivable, setShippingAvalivable } = useContext(ItemsContext);
  const [selectedDelivery, setSelectedDelivery] = useState("formS2");

  if (cart.length === 0) {
    return <div className="text-red-500">Brak przedmiotów w koszyku</div>;
  }

  const handleDeliveryOptionClick = (option) => {
    setSelectedDelivery(option);
  };

  return (
    <div className="my-4 p-4 bg-white rounded-md shadow-md">
      <label className="block font-bold mb-2">Wybierz rodzaj dostawy:</label>
      <div className="flex space-x-4">
        <button
          onClick={() => handleDeliveryOptionClick("formS2")}
          className={`py-2 px-4 rounded-md focus:outline-none ${selectedDelivery === "formS2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Kurier
        </button>
        {shippingAvalivable && (
          <button
            onClick={() => handleDeliveryOptionClick("formS1")}
            className={`py-2 px-4 rounded-md focus:outline-none ${selectedDelivery === "formS1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Paczkomat
          </button>
        )}
      </div>

      {selectedDelivery === "formS1" ? <FormS1 /> : <FormS2 />}
    </div>
  );
}

export default Shipping;
