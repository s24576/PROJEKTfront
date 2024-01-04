import React, { useState } from "react";
import FormS1 from "./FormS1";
import FormS2 from "./FormS2";

function Shipping() {
    const [selectedDelivery, setSelectedDelivery] = useState("");

    return (
        <div>
            <label>
                Wybierz rodzaj dostawy:
                <select value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)}>
                    <option value="formS1">Paczkomat</option>
                    <option value="formS2">Kurier</option>
                </select>
            </label>
            
            {selectedDelivery === "formS1" ? <FormS1 /> : <FormS2 />}
        </div>
    );
}

export default Shipping;
