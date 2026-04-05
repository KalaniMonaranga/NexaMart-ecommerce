import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrencyDisplay } from '../utils/currency.js';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  // State to track selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Order History state
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Initialize all items as selected when cart loads
  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedItems(cartItems.map(item => item._id));
      setSelectAll(true);
    }
  }, [cartItems.length]);
  
  // Fetch recent orders
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const ordersData = await response.json();
          setRecentOrders(ordersData.slice(0, 3)); // Get only last 3 orders
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchRecentOrders();
  }, []);

  // Handle individual item selection
  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        const newSelected = prev.filter(id => id !== itemId);
        setSelectAll(newSelected.length === cartItems.length);
        return newSelected;
      } else {
        const newSelected = [...prev, itemId];
        setSelectAll(newSelected.length === cartItems.length);
        return newSelected;
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(cartItems.map(item => item._id));
      setSelectAll(true);
    }
  };

  // Get selected cart items
  const getSelectedCartItems = () => {
    return cartItems.filter(item => selectedItems.includes(item._id));
  };

  // Calculate totals for selected items only
  const getSelectedTotalPrice = () => {
    return getSelectedCartItems().reduce((total, item) => {
      const price = parseFloat(item.priceAtPurchase || item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const handleRemoveFromCart = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId);
      // Also remove from selected items
      setSelectedItems(prev => prev.filter(id => id !== productId));
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    // Store selected items for checkout
    const selectedCartItems = getSelectedCartItems();
    localStorage.setItem('nexamart_selected_cart', JSON.stringify(selectedCartItems));
    
    navigate('/checkout');
  };

  const selectedCount = selectedItems.length;
  const selectedTotal = getSelectedTotalPrice();

  const getImageUrl = (item) => {
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return { bg: '#fff3cd', text: '#856404', border: '#ffc107' };
      case 'Confirmed': return { bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8' };
      case 'Shipped': return { bg: '#cce5ff', text: '#004085', border: '#003366' };
      case 'Delivered': return { bg: '#d4edda', text: '#155724', border: '#28a745' };
      case 'Cancelled': return { bg: '#f8d7da', text: '#721c24', border: '#dc3545' };
      default: return { bg: '#f8f9fa', text: '#6c757d', border: '#dee2e6' };
    }
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
                {/* Selection Controls */}
                <div className="d-flex justify-content-between align-items-center mb-3 bg-light p-3 rounded">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAll"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <label className="form-check-label fw-bold" htmlFor="selectAll">
                      Select All Items
                    </label>
                  </div>
                  <small className="text-muted">
                    {selectedCount} of {cartItems.length} selected
                  </small>
                </div>
                
                {cartItems.map((item) => {
                  const isSelected = selectedItems.includes(item._id);
                  return (
                    <div 
                      key={item._id} 
                      className={`card mb-3 border-0 shadow-sm ${isSelected ? 'border-primary' : ''}`}
                      style={{ borderLeft: isSelected ? '4px solid #003366' : '4px solid transparent' }}
                    >
                      <div className="row g-0 p-3">
                        {/* Checkbox Column */}
                        <div className="col-md-1 d-flex align-items-center justify-content-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectItem(item._id)}
                              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                        
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
                  );
                })}
              </div>
              
              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">Order Summary</h5>
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Selected Items ({selectedCount}):</span>
                      <span className="fw-bold">{formatCurrencyDisplay(selectedTotal)}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">
                        {selectedTotal >= 5000 ? 'FREE' : formatCurrencyDisplay(300)}
                      </span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax (10%):</span>
                      <span>{formatCurrencyDisplay(selectedTotal * 0.1)}</span>
                    </div>
                    
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total:</span>
                      <span className="text-primary">
                        {formatCurrencyDisplay(selectedTotal * 1.1 + (selectedTotal >= 5000 ? 0 : 300))}
                      </span>
                    </div>
                    
                    <div className="alert alert-success small mt-3" role="alert">
                      <i className="bi bi-truck me-2"></i>
                      Free shipping on orders over Rs. 5,000
                    </div>
                    
                    <button 
                      className="btn btn-lg btn-primary w-100 mt-3 rounded-0 fw-bold"
                      onClick={handleCheckout}
                      disabled={selectedCount === 0}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      PROCEED TO CHECKOUT
                      {selectedCount > 0 && (
                        <span className="badge bg-white text-primary ms-2">{selectedCount}</span>
                      )}
                    </button>
                    
                    {selectedCount > 0 && selectedCount < cartItems.length && (
                      <div className="alert alert-info small mt-2" role="alert">
                        <i className="bi bi-info-circle me-2"></i>
                        Only {selectedCount} item(s) selected for checkout
                      </div>
                    )}
                    
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
                
                {/* Order History Section */}
                {recentOrders.length > 0 && (
                  <div className="card border-0 shadow-sm mt-4">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0" style={{ color: '#003366' }}>
                        <i className="bi bi-clock-history me-2"></i>Recent Orders
                      </h6>
                      <Link to="/my-orders" className="btn btn-sm btn-outline-primary">
                        View All Orders
                      </Link>
                    </div>
                    <div className="card-body p-0">
                      {recentOrders.map((order) => {
                        const colors = getStatusColor(order.status);
                        return (
                          <div 
                            key={order._id} 
                            className="p-3 border-bottom cursor-pointer hover-bg-light"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="fw-bold mb-1">
                                  Order #{order._id.slice(-8).toUpperCase()}
                                </h6>
                                <small className="text-muted">
                                  {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} items
                                </small>
                              </div>
                              <div className="text-end">
                                <span 
                                  className="badge mb-1"
                                  style={{ 
                                    backgroundColor: colors.bg, 
                                    color: colors.text,
                                    border: `1px solid ${colors.border}`
                                  }}
                                >
                                  {order.status}
                                </span>
                                <h6 className="fw-bold text-primary mb-0">
                                  {formatCurrencyDisplay(order.totalPrice)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
