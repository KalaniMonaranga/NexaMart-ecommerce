import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatCurrencyDisplay } from '../utils/currency.js';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

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
        setLastUpdated(new Date());
        setError('');
      } else {
        setError('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // Poll for updates every 10 seconds
  useEffect(() => {
    fetchOrder();
    let interval;
    if (isLive) {
      interval = setInterval(fetchOrder, 10000);
    }
    return () => clearInterval(interval);
  }, [orderId, isLive]);

  const getStatusSteps = () => {
    return [
      { key: 'Processing', label: 'Order Placed', icon: 'bi-file-earmark-text', description: 'Your order has been received' },
      { key: 'Confirmed', label: 'Order Confirmed', icon: 'bi-check-circle', description: 'Order confirmed by seller' },
      { key: 'Shipped', label: 'In Transport', icon: 'bi-truck', description: 'Your order is on the way' },
      { key: 'Delivered', label: 'Delivered', icon: 'bi-box-seam', description: 'Order delivered successfully' }
    ];
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    const steps = getStatusSteps();
    const index = steps.findIndex(step => step.key === order.status);
    return index === -1 ? 0 : index;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#ffc107';
      case 'Confirmed': return '#17a2b8';
      case 'Shipped': return '#003366';
      case 'Delivered': return '#28a745';
      case 'Cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '60px' }}>
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '60px' }}>
        <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
        <h4 className="mt-3">{error || 'Order not found'}</h4>
        <Link to="/my-orders" className="btn btn-primary mt-3">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStep = getCurrentStepIndex();
  const statusSteps = getStatusSteps();

  return (
    <div className="container py-5" style={{ minHeight: '80vh', marginTop: '60px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#003366' }}>
            <i className="bi bi-geo-alt me-2"></i>Order Tracking
          </h2>
          <p className="text-muted mb-0">Order ID: <strong>{order._id}</strong></p>
        </div>
        <div className="text-end">
          {/* Live Status Indicator */}
          <div className="d-flex align-items-center justify-content-end mb-2">
            <span 
              className="badge bg-success me-2 d-flex align-items-center"
              style={{ fontSize: '11px' }}
            >
              <span 
                className="spinner-grow spinner-grow-sm me-1" 
                style={{ width: '8px', height: '8px' }}
              ></span>
              LIVE
            </span>
            <small className="text-muted">
              Updated: {lastUpdated.toLocaleTimeString()}
            </small>
            <button 
              className="btn btn-sm btn-outline-secondary ms-2"
              onClick={() => setIsLive(!isLive)}
              title={isLive ? 'Pause updates' : 'Resume updates'}
            >
              <i className={`bi ${isLive ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
            </button>
            <button 
              className="btn btn-sm btn-outline-primary ms-1"
              onClick={fetchOrder}
              title="Refresh now"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
          <span 
            className="badge fs-6 px-3 py-2"
            style={{ 
              backgroundColor: getStatusColor(order.status),
              color: order.status === 'Processing' ? '#000' : '#fff'
            }}
          >
            <i className={`bi ${statusSteps[currentStep]?.icon || 'bi-box'} me-2`}></i>
            {order.status}
          </span>
          <p className="text-muted small mt-2 mb-0">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      {order.status !== 'Cancelled' && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Order Status</h5>
            <div className="position-relative">
              {/* Progress Bar Background */}
              <div className="progress mb-4" style={{ height: '8px' }}>
                <div 
                  className="progress-bar"
                  role="progressbar"
                  style={{ 
                    width: `${((currentStep + 1) / statusSteps.length) * 100}%`,
                    backgroundColor: '#003366'
                  }}
                ></div>
              </div>

              {/* Steps */}
              <div className="row text-center">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={step.key} className="col-3">
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${
                          isCompleted ? 'bg-navy text-white' : 'bg-light text-muted'
                        }`}
                        style={{ 
                          width: '60px', 
                          height: '60px',
                          backgroundColor: isCompleted ? '#003366' : '#f8f9fa',
                          border: isCurrent ? '3px solid #00AEEF' : 'none'
                        }}
                      >
                        <i className={`bi ${step.icon} fs-4`}></i>
                      </div>
                      <h6 className={`fw-bold mb-1 ${isCompleted ? 'text-navy' : 'text-muted'}`} style={{ color: isCompleted ? '#003366' : '#6c757d' }}>
                        {step.label}
                      </h6>
                      <small className="text-muted d-none d-md-block">{step.description}</small>
                      {isCurrent && (
                        <span className="badge bg-info mt-1">Current</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancelled Alert */}
      {order.status === 'Cancelled' && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-x-circle me-2"></i>
          <strong>Order Cancelled</strong> - This order has been cancelled.
        </div>
      )}

      <div className="row">
        {/* Order Items */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-box-seam me-2"></i>Order Items
              </h5>
              {order.status === 'Delivered' && (
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>Ready to Rate
                </span>
              )}
            </div>
            <div className="card-body">
              {order.orderItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    className="rounded me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <p className="text-muted small mb-1">Quantity: {item.quantity}</p>
                    <p className="text-muted small mb-0">
                      Unit Price: {formatCurrencyDisplay(item.price)}
                    </p>
                  </div>
                  <div className="text-end">
                    <h6 className="fw-bold text-primary mb-2">
                      {formatCurrencyDisplay(item.price * item.quantity)}
                    </h6>
                    {order.status === 'Delivered' && (
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => navigate(`/product/${item.product}`)}
                        title="Rate this product"
                      >
                        <i className="bi bi-star me-1"></i>Rate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-geo-alt me-2"></i>Shipping Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold text-muted mb-2">Delivery Address</h6>
                  <p className="mb-1">{order.shippingAddress.address}</p>
                  <p className="mb-1">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p className="mb-0">{order.shippingAddress.country}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold text-muted mb-2">Payment Method</h6>
                  <p className="mb-1">
                    <i className={`bi ${order.paymentMethod === 'Card' ? 'bi-credit-card' : order.paymentMethod === 'PayPal' ? 'bi-paypal' : 'bi-cash'} me-2`}></i>
                    {order.paymentMethod}
                  </p>
                  <p className="mb-0">
                    <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning'}`}>
                      {order.isPaid ? 'Paid' : 'Payment Pending'}
                    </span>
                  </p>
                  {order.paidAt && (
                    <small className="text-muted d-block mt-1">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '80px' }}>
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-receipt me-2"></i>Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items ({order.orderItems.length}):</span>
                <span>{formatCurrencyDisplay(order.itemsPrice)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping:</span>
                <span className={order.shippingPrice === 0 ? 'text-success' : ''}>
                  {order.shippingPrice === 0 ? 'FREE' : formatCurrencyDisplay(order.shippingPrice)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tax (10%):</span>
                <span>{formatCurrencyDisplay(order.taxPrice)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span className="text-primary">{formatCurrencyDisplay(order.totalPrice)}</span>
              </div>

              {order.status === 'Delivered' && (
                <div className="alert alert-success mt-3 mb-0" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Order delivered successfully!
                  {order.deliveredAt && (
                    <small className="d-block mt-1">
                      Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                    </small>
                  )}
                </div>
              )}

              <Link to="/my-orders" className="btn btn-outline-secondary w-100 mt-3">
                <i className="bi bi-arrow-left me-2"></i>Back to My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
