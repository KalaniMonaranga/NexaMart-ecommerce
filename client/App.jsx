import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Footer from "./components/Footer"; 

// 1. Context Provider
import { CartProvider } from './src/context/CartContext.jsx'; 
import { AuthProvider } from './src/context/AuthContext.jsx'; 
import { WishlistProvider } from './src/context/WishlistContext.jsx'; 

// 2. Styles
import './src/index.css'; // Make sure your global styles are imported here

// 3. Components & Pages
import Navbar from './src/components/Navbar';
import Home from './src/Pages/Home';
import Shop from './src/Pages/Shop'; 
import AdminPanel from './src/Pages/AdminPanel'; 
import AccountPage from './src/Pages/AccountPage';
import ProductPage from './src/Pages/ProductPage';
import ProductDetail from './src/Pages/ProductDetail';
import WishlistPage from './src/Pages/WishlistPage';
import Cart from "./src/Pages/Cart";
import Login from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import Checkout from "./src/Pages/Checkout";
import OrderSuccess from "./src/Pages/OrderSuccess";
import MyOrders from "./src/Pages/MyOrders";
import OrderTracking from "./src/Pages/OrderTracking";
import ForgotPassword from "./src/Pages/ForgotPassword";
import ResetPassword from "./src/Pages/ResetPassword";
import EditProduct from "./src/Pages/EditProduct";
import AboutUs from "./src/Pages/AboutUs";
import ContactUs from "./src/Pages/ContactUs";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            {/* We move the background color here to cover the whole screen */}
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              
              {/* Pass user from AuthContext to Navbar */}
              <Navbar /> 
              
              {/* Removed the 'container' class from main so banners can be full-width */}
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                  <Route path="/order/:orderId" element={<OrderTracking />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/edit-product/:id" element={<EditProduct />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Routes>
              </main>
              
              {/* You can add a <Footer /> here later */}
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;