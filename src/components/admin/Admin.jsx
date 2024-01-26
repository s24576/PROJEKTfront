import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import ItemList from './ItemList';
import AddItem from './AddItem';
import ShippingChart from './ShippingChart';

function Admin() {
    const { user } = useContext(UserContext);
    const [showItemList, setShowItemList] = useState(true);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showShippingChart, setShowShippingChart] = useState(false);

    if (!user || !user.admin) {
        return "brak uprawnień";
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-4 py-4">
                <button
                    onClick={() => { setShowItemList(true); setShowAddItem(false); setShowShippingChart(false); }}
                    className={`py-2 px-4 rounded-md focus:outline-none ${showItemList ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Pokaż listę przedmiotów
                </button>
                <button
                    onClick={() => { setShowItemList(false); setShowAddItem(true); setShowShippingChart(false); }}
                    className={`py-2 px-4 rounded-md focus:outline-none ${showAddItem ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Dodaj przedmiot
                </button>
                <button
                    onClick={() => { setShowItemList(false); setShowAddItem(false); setShowShippingChart(true); }}
                    className={`py-2 px-4 rounded-md focus:outline-none ${showShippingChart ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Wykres dostaw
                </button>
            </div>
            {showItemList && <ItemList />}
            {showAddItem && <AddItem />}
            {showShippingChart && <ShippingChart />}
        </div>
    );
}

export default Admin;
