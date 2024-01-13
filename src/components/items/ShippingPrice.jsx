import React from "react";

function ShippingPrice({ price, shipping1, shipping2 }) {
  let sPrice;
  if (shipping1) {
    sPrice = 10;
  } else {
    sPrice = 20;
  }

  return (
    <div className="mx-auto p-4">
      <div className="flex">
        <div className="w-1/2">
          <div className="text-lg">Cena: {price}</div>
        </div>
        <div className="w-1/2">
          <div className="text-lg">+ Dostawa: {sPrice}</div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPrice;
