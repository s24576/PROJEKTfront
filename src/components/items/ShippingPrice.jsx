import React from "react";

function ShippingPrice({ price, shipping1, shipping2 }) {
  let sPrice;
  if (shipping1) {
    sPrice = 10;
  } else {
    sPrice = 20;
  }

  return (
  <div className="mx-auto p-4 flex">
    <div className="price w-1/2 relative text-lg text-gray-70">
      Cena: {price}
    </div>
    <div className="price w-1/2 relative text-lg text-green-600">
      + Dostawa: {sPrice}
    </div>
  </div>
  );
}

export default ShippingPrice;
