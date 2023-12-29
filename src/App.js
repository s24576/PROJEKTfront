import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import { ItemsProvider } from './components/context/ItemsContext';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Admin from './components/admin/Admin';
import ItemInfo from './components/items/ItemInfo';
import Cart from './components/items/Cart';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ItemsProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/main" element={<Main />} />
              <Route path="/info" element={<ItemInfo />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          </ItemsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;