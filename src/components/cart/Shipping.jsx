import React, { useContext, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import FormS1 from "./FormS1";
import FormS2 from "./FormS2";


function Shipping() {
    const {cart}=useContext(ItemsContext);
    const [selectedDelivery, setSelectedDelivery] = useState("");

    if(cart.length===0){
        return(<div>Brak przedmiotów w koszyku</div>);
    }

    return (
        <div>
            <label>
                Wybierz rodzaj dostawy:
                <select value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)}>
                    <option value="formS2">Kurier</option>
                    <option value="formS1">Paczkomat</option>
                </select>
            </label>
            
            {selectedDelivery === "formS1" ? <FormS1 /> : <FormS2 />}
        </div>
    );
}

export default Shipping;
