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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-warning';
      case 'Confirmed':
        return 'bg-info';
      case 'Shipped':
        return 'bg-primary';
      case 'Delivered':
        return 'bg-success';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
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
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">Order ID: {order._id}</h6>
                    <small className="text-muted">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div>
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {order.isPaid && (
                      <span className="badge bg-success ms-2">Paid</span>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="mb-3">Order Items</h6>
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
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
                    </div>
                    <div className="col-md-4">
                      <div className="border-start ps-3">
                        <h6 className="mb-3">Order Summary</h6>
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
                        <div className="d-flex justify-content-between fw-bold">
                          <span>Total:</span>
                          <span className="text-primary">{formatCurrencyDisplay(order.totalPrice)}</span>
                        </div>
                        
                        <div className="mt-3">
                          <h6 className="mb-2">Shipping Address</h6>
                          <small className="text-muted">
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                            {order.shippingAddress.country}
                          </small>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            View Details
                          </button>
                          {order.status === 'Delivered' && (
                            <button className="btn btn-sm btn-primary">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
