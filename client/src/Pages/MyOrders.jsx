import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyDisplay } from '../utils/currency.js';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return 'bi-hourglass-split';
      case 'Confirmed': return 'bi-check-circle';
      case 'Shipped': return 'bi-truck';
      case 'Delivered': return 'bi-box-seam';
      case 'Cancelled': return 'bi-x-circle';
      default: return 'bi-circle';
    }
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

  const getStatusDescription = (status) => {
    switch (status) {
      case 'Processing': return 'Your order is being processed';
      case 'Confirmed': return 'Order confirmed by seller';
      case 'Shipped': return 'Your order is on the way';
      case 'Delivered': return 'Order delivered successfully';
      case 'Cancelled': return 'Order has been cancelled';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Orders</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box-seam display-1 text-muted"></i>
          <h4 className="mt-3">No orders yet</h4>
          <p className="text-muted">Start shopping to see your orders here</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => {
            const statusColors = getStatusColor(order.status);
            return (
            <div key={order._id} className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                  <div>
                    <h6 className="mb-1 fw-bold">Order #{order._id.slice(-8).toUpperCase()}</h6>
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: statusColors.bg, 
                        color: statusColors.text,
                        border: `1px solid ${statusColors.border}`
                      }}
                    >
                      <i className={`bi ${getStatusIcon(order.status)} me-1`}></i>
                      {order.status}
                    </span>
                    {order.isPaid && (
                      <span className="badge bg-success ms-2">Paid</span>
                    )}
                    <small className="d-block text-muted mt-1">
                      {getStatusDescription(order.status)}
                    </small>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="mb-3 text-muted">Order Items ({order.orderItems.length})</h6>
                      {order.orderItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="me-3 rounded"
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">Qty: {item.quantity}</small>
                            </div>
                          </div>
                          <div>
                            <strong>{formatCurrencyDisplay(item.price * item.quantity)}</strong>
                          </div>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <p className="text-muted small mb-0">
                          +{order.orderItems.length - 3} more items
                        </p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="border-start ps-3">
                        <h6 className="mb-3 text-muted">Order Summary</h6>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Items:</span>
                          <span>{formatCurrencyDisplay(order.itemsPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Shipping:</span>
                          <span>{formatCurrencyDisplay(order.shippingPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Tax:</span>
                          <span>{formatCurrencyDisplay(order.taxPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-5">
                          <span>Total:</span>
                          <span className="text-primary">{formatCurrencyDisplay(order.totalPrice)}</span>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                          <button 
                            className="btn btn-primary"
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            <i className="bi bi-geo-alt me-2"></i>Track Order
                          </button>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            View Details
                          </button>
                          {order.status === 'Delivered' && (
                            <button className="btn btn-outline-success btn-sm">
                              <i className="bi bi-cart-plus me-2"></i>Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
