import React, { useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import '../styles/navbar.less'

function Navbar() {
  const navigate= useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    setUser(null);
  };

  const handleUser = () =>{
    const address = '/user/'+user._id;
    navigate(address);
  }

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
            <li onClick={handleUser}>Zalogowany: {user.email}</li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
