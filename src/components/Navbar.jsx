import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';

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
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between items-center px-6">
        <li>
          <Link to="/" className="hover:text-gray-300">Strona główna</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-300">Koszyk</Link>
        </li>
        {!user && (
          <div className='flex space-x-2'>
            <li>
              <Link to="/login" className="hover:text-gray-300">Zaloguj</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">Zarejestruj</Link>
            </li>
          </div>
        )}
        {user && (
          <>
            {user.admin && (
              <li>
                <Link to="/admin" className="hover:text-gray-300">Panel admina</Link>
              </li>
            )}
            <div className='flex space-x-2'>
              <li>
                <button onClick={handleUser} className="hover:text-gray-300">Historia zamówień</button>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">Wyloguj</button>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
