import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { getWishlistCount } = useWishlist();

  const cartItemsCount = getTotalItems();
  const wishlistItemsCount = getWishlistCount();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm py-3" style={{ backgroundColor: '#003366' }}>
      <div className="container">
        {/* 1. BRAND LOGO */}
        <Link className="navbar-brand fw-bold text-white fs-3" to="/">
          NEXA<span style={{ color: '#00AEEF' }}>MART</span>
        </Link>

        {/* 2. MOBILE TOGGLE BUTTON */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 3. CENTER LINKS */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-500" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-500" to="/shop">SHOP</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-white px-3 fw-500" to="/my-orders">
                  <i className="bi bi-truck me-1"></i>MY ORDERS
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-500 position-relative" to="/wishlist">
                WISHLIST
                {/* 🟢 Show badge on Wishlist link if items exist */}
                {wishlistItemsCount > 0 && (
                  <span className="badge rounded-pill bg-info ms-1" style={{ fontSize: '10px' }}>
                    {wishlistItemsCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-500" to="/about">ABOUT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-500" to="/contact">CONTACT</Link>
            </li>
          </ul>

          {/* 4. RIGHT SIDE (Icons & Auth) */}
          <div className="d-flex align-items-center gap-3">
            
            {/* ADMIN PANEL BUTTON (Conditional) */}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="btn btn-outline-info btn-sm rounded-pill px-3 fw-bold border-2 text-white">
                ADMIN PANEL
              </Link>
            )}

            {/* CART ICON */}
            <Link to="/cart" className="text-white position-relative mx-2">
              <i className="bi bi-bag fs-4"></i>
              {/* 🟢 4. Dynamically show the number of items in cartItems */}
              {cartItemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* AUTH LINKS */}
            {user ? (
              <>
                {/* PROFILE / ACCOUNT LINK */}
                <Link to="/account" className="nav-link p-0 d-flex align-items-center">
                  <span className="text-white me-2 small d-none d-lg-inline">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  {user.profilePic ? (
                    <img 
                      src={user.profilePic} 
                      alt="Profile" 
                      className="rounded-circle border border-2 border-white" 
                      style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person-circle fs-3 text-white"></i>
                  )}
                </Link>
                
                {/* LOGOUT BUTTON */}
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold border-2 text-white"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-info btn-sm rounded-pill px-3 fw-bold border-2 text-white">
                  LOGIN
                </Link>
                <Link to="/register" className="btn btn-info btn-sm rounded-pill px-3 fw-bold text-white">
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;