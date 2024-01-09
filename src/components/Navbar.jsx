import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import '../styles/navbar.less'

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [theme, setTheme] = useState('theme-light');

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    setUser(null);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav>
      <ul>
        <div className='nav-container'>
          <div className='lewa'>
            <li>
              <Link to="/">Strona główna</Link>
            </li>
            <li>
              <Link to="/cart">Koszyk</Link>
            </li>
          </div>
            {!user && (
            <div className='login'>
              <li>
                <Link to="/login">Zaloguj</Link>
              </li>
              <li>
                <Link to="/register">Zarejestruj</Link>
              </li>
            </div>
            )}
        </div>
        
        
        {user && (
          <>
            {user.admin && (
              <li>
                <Link to="/admin">Panel admina</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>Zalogowany: {user.email}</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
