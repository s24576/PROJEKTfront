import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from './context/UserContext';

function Navbar() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav>
            <ul>
            {!user && (
            <>
                <li><Link to="/login">Zaloguj</Link></li>
                <li><Link to="/register">Zarejstruj</Link></li>
                <li><Link to="/main">Strona główna</Link></li>
                <li><Link to="/cart">Koszyk</Link></li>
            </>
            )}
            {user && (
            <>
                {user.admin && (
                <li><Link to="/admin">Panel admina</Link></li>
                )}
                <li><button onClick={handleLogout}>Logout</button></li>
                <li>User in Navbar: {user.email}</li>
            </>
            )}
            </ul>
        </nav>
  );
}

export default Navbar;