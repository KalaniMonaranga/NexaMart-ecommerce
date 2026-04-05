import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrencyDisplay } from '../utils/currency.js';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const getImageUrl = (item) => {
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80';
  };

  return (
    <div className="container py-5" style={{ minHeight: '80vh', marginTop: '60px' }}>
      <div className="card shadow-sm border-0 rounded-0 bg-white">
        <div className="p-4">
          <h2 className="fw-bold mb-4" style={{ color: '#003366' }}>
            <i className="bi bi-cart3 me-2"></i>Shopping Cart
          </h2>
          <hr />
          
          {cartItems.length === 0 ? (
            <div className="py-5 text-center">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h4 className="mt-3 text-secondary">Your cart is currently empty</h4>
              <p className="text-muted">Add some products to get started!</p>
              <Link to="/" className="btn btn-lg btn-primary mt-3 px-5 rounded-0 fw-bold">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <small className="text-muted">{cartItems.length} items in cart</small>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item._id} className="card mb-3 border-0 shadow-sm">
                    <div className="row g-0 p-3">
                      <div className="col-md-2">
                        <img 
                          src={getImageUrl(item)} 
                          className="img-fluid rounded" 
                          alt={item.name}
                          style={{ height: '80px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title fw-bold">{item.name}</h5>
                        <p className="text-muted small mb-1">{item.description}</p>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-tag me-1"></i>{item.category}
                        </p>
                        <p className="fw-bold text-primary fs-5">{formatCurrencyDisplay(item.priceAtPurchase || item.price)}</p>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label small">Quantity</label>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary rounded-0"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary rounded-0"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <div className="mb-2">
                          <small className="text-muted">Subtotal</small>
                          <h5 className="fw-bold text-primary">
                            {formatCurrencyDisplay((item.priceAtPurchase || item.price) * item.quantity)}
                          </h5>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-danger rounded-0"
                          onClick={() => handleRemoveFromCart(item._id)}
                          title="Remove item"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">Order Summary</h5>
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal ({cartItems.length} items):</span>
                      <span className="fw-bold">{formatCurrencyDisplay(getTotalPrice())}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">FREE</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax:</span>
                      <span>{formatCurrencyDisplay(getTotalPrice() * 0.1)}</span>
                    </div>
                    
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total:</span>
                      <span className="text-primary">{formatCurrencyDisplay(getTotalPrice() * 1.1)}</span>
                    </div>
                    
                    <div className="alert alert-success small mt-3" role="alert">
                      <i className="bi bi-truck me-2"></i>
                      Free shipping on orders over Rs. 5,000
                    </div>
                    
                    <button 
                      className="btn btn-lg btn-primary w-100 mt-3 rounded-0 fw-bold"
                      onClick={() => navigate('/checkout')}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      PROCEED TO CHECKOUT
                    </button>
                    
                    <Link to="/" className="btn btn-outline-secondary w-100 mt-2 rounded-0">
                      <i className="bi bi-arrow-left me-2"></i>
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </div>
                
                {/* Security Badge */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure Checkout
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
