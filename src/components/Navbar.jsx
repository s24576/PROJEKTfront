import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import '../styles/navbar.sass';

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    setUser(null);
  };

  const handleUser = () => {
    const address = '/user/' + user._id;
    navigate(address);
  };

  return (
    <nav>
      <ul className='nav-container'>
          <li>
            <Link to="/">Strona główna</Link>
          </li>
          <li>
            <Link to="/cart">Koszyk</Link>
          </li>
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
        {user && (
          <>
            {user.admin && (
              <li>
                <Link to="/admin">Panel admina</Link>
              </li>
            )}
              <div className='navButton'>
                <li><button onClick={handleUser}>Historia zamówień</button></li>
                <li><button onClick={handleLogout}>Wyloguj</button></li>
              </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
