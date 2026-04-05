import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Context Provider
import { CartProvider } from './context/CartContext'; 

// 2. Styles
import './App.css';

// 3. Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 4. Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import WishlistPage from './Pages/WishlistPage';
import AdminPanel from './Pages/AdminPanel'; 
import AccountPage from './Pages/AccountPage';
import ProductPage from './Pages/ProductPage';
import Cart from './Pages/Cart';
import Login from './Pages/Login'; // Added Login
import Register from './Pages/Register'; // Added Register
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';

function App() {
  // GET REAL USER DATA (Replaces testUser)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item._id === product._id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== id));
  };

  return (
    <CartProvider>
      <Router>
        {/* Pass real userInfo to Navbar */}
        <Navbar user={userInfo} wishlistCount={wishlistItems.length} /> 
        
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            
            {/* Login & Register Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/wishlist" element={
              <WishlistPage 
                wishlistItems={wishlistItems} 
                removeFromWishlist={removeFromWishlist} 
              />
            } />
            
            {/* PROTECTED: Cart (Redirects to Login if guest) */}
            <Route path="/cart" element={
              userInfo ? <Cart /> : <Navigate to="/login" />
            } />

            {/* PROTECTED: Admin (Redirects to Login if not admin) */}
            <Route path="/admin" element={
              userInfo?.isAdmin || userInfo?.role === 'admin' ? 
              <AdminPanel user={userInfo} /> : <Navigate to="/login" />
            } />

            <Route path="/account" element={
              userInfo ? <AccountPage user={userInfo} /> : <Navigate to="/login" />
            } />
            
            <Route path="/product/:id" element={<ProductPage addToWishlist={addToWishlist} />} />
            
            {/* About and Contact Routes */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;