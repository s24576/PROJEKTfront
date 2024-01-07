import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { OpinionsProvider } from '../context/OpinionsContext';
import ItemList from './ItemList';
import AddItem from './AddItem';
import EditItem from './EditItem';

function Admin() {
    const { user } = useContext(UserContext);

    if (!user || !user.admin) {
        return "brak uprawnień";
    }

    return (
    <div>
        <OpinionsProvider>
            <ItemList />
        </OpinionsProvider>
        <AddItem />
    </div>
    );
}

export default Admin;
