import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from './context/UserContext';

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    
    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        setUser(null);
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/cart">Koszyk</Link></li>
                {!user && (
                <>
                    <li><Link to="/login">Zaloguj</Link></li>
                    <li><Link to="/register">Zarejstruj</Link></li>
                    
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
