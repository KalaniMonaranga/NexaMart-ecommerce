import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatCurrencyDisplay } from '../utils/currency.js';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [shippingAddress, setShippingAddress] = useState({
    address: user?.address || '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const itemsPrice = getTotalPrice();
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.08; // 8% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create order
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
          price: item.price,
          product: item._id
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      const order = await response.json();

      if (response.ok) {
        // Process payment (mock)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update order to paid
        await fetch(`http://localhost:5000/api/orders/${order._id}/pay`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id: 'mock_payment_id',
            status: 'COMPLETED',
            update_time: new Date().toISOString(),
            email_address: user.email
          })
        });

        clearCart();
        navigate(`/order-success/${order._id}`);
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to checkout</p>
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
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Checkout</h4>
            </div>
            <div className="card-body">
              {/* Progress Steps */}
              <div className="d-flex justify-content-between mb-4">
                <div className={`text-center ${currentStep >= 1 ? 'text-primary' : 'text-muted'}`}>
                  <div className={`rounded-circle p-3 mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-light'}`}>
                    1
                  </div>
                  <small>Shipping</small>
                </div>
                <div className={`text-center ${currentStep >= 2 ? 'text-primary' : 'text-muted'}`}>
                  <div className={`rounded-circle p-3 mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-light'}`}>
                    2
                  </div>
                  <small>Payment</small>
                </div>
                <div className={`text-center ${currentStep >= 3 ? 'text-primary' : 'text-muted'}`}>
                  <div className={`rounded-circle p-3 mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-light'}`}>
                    3
                  </div>
                  <small>Review</small>
                </div>
              </div>

              {currentStep === 1 && (
                <form onSubmit={handleShippingSubmit}>
                  <h5 className="mb-4">Shipping Information</h5>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Continue to Payment
                  </button>
                </form>
              )}

              {currentStep === 2 && (
                <form onSubmit={handlePaymentSubmit}>
                  <h5 className="mb-4">Payment Information</h5>
                  
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="Card">Credit/Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Cash">Cash on Delivery</option>
                    </select>
                  </div>

                  {paymentMethod === 'Card' && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cardholder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          required
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Expiry Date</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            required
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="123"
                            required
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing Payment...
                        </>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between mb-2">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <div>{formatCurrencyDisplay(item.price * item.quantity)}</div>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>{formatCurrencyDisplay(itemsPrice)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>{formatCurrencyDisplay(shippingPrice)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>{formatCurrencyDisplay(taxPrice)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span className="text-primary">{formatCurrencyDisplay(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
