import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ItemList from './ItemList';
import AddItem from './AddItem';
import ShippingChart from './ShippingChart';

function Admin() {
    const { user } = useContext(UserContext);

    if (!user || !user.admin) {
        return "brak uprawnień";
    }

    return (
    <div>
        <ItemList />
        <AddItem />
        <ShippingChart />
    </div>
    );
}

export default Admin;
