import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatCurrencyDisplay } from '../utils/currency.js';
import { useAuth } from '../context/AuthContext';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h2>Order not found</h2>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              
              <h2 className="mb-3">Order Placed Successfully!</h2>
              <p className="text-muted mb-4">
                Thank you for your order. Your order has been received and is being processed.
              </p>

              <div className="alert alert-success">
                <h5>Order Details</h5>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> {formatCurrencyDisplay(order.totalPrice)}</p>
                <p><strong>Payment Status:</strong> 
                  <span className={`badge ms-2 ${order.isPaid ? 'bg-success' : 'bg-warning'}`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
                <p><strong>Order Status:</strong> 
                  <span className="badge bg-info ms-2">{order.status}</span>
                </p>
              </div>

              <div className="mb-4">
                <h5>Shipping Address</h5>
                <p className="mb-0">{order.shippingAddress.address}</p>
                <p className="mb-0">
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>

              <div className="mb-4">
                <h5>Order Items</h5>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
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
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5>Total Amount</h5>
                  <small className="text-muted">Items: {formatCurrencyDisplay(order.itemsPrice)}</small><br />
                  <small className="text-muted">Shipping: {formatCurrencyDisplay(order.shippingPrice)}</small><br />
                  <small className="text-muted">Tax: {formatCurrencyDisplay(order.taxPrice)}</small>
                </div>
                <div className="text-end">
                  <h3 className="text-primary">{formatCurrencyDisplay(order.totalPrice)}</h3>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-center">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/my-orders')}
                >
                  View My Orders
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <h6>What's Next?</h6>
                <div className="row text-start">
                  <div className="col-md-4 mb-2">
                    <i className="bi bi-envelope text-primary me-2"></i>
                    <small>Order confirmation sent to {user.email}</small>
                  </div>
                  <div className="col-md-4 mb-2">
                    <i className="bi bi-truck text-primary me-2"></i>
                    <small>Processing order for shipment</small>
                  </div>
                  <div className="col-md-4 mb-2">
                    <i className="bi bi-box-seam text-primary me-2"></i>
                    <small>Estimated delivery: 3-5 business days</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
