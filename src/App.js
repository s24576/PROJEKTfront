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
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import Order from './components/cart/Order';
import { SortProvider } from './components/context/SortContext';
import './styles/main.less';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ItemsProvider>
        <SortProvider>
          <div className='App'>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<Main />} />
              <Route path="/info/:itemId" element={<ItemInfo />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/:orderId" element={<Order />} />

              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          </SortProvider>
        </ItemsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;