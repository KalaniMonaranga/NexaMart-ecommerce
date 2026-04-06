import React, { useState, useEffect } from 'react';
import { formatCurrencyDisplay } from '../utils/currency.js';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
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

  // Poll for updates every 5 seconds for real-time updates
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order => 
          order._id === orderId ? updatedOrder : order
        ));
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        alert(`Order status updated to ${newStatus}`);
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating order status');
    } finally {
      setUpdatingStatus(false);
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

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getOrderCounts = () => {
    const counts = { All: orders.length };
    orders.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  };

  const orderCounts = getOrderCounts();

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-order-management">
      {/* Stats Cards */}
      <div className="row mb-4">
        {['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
          <div key={status} className="col-md-2 col-4 mb-2">
            <div 
              className="card text-center cursor-pointer"
              onClick={() => setStatusFilter(status)}
              style={{ 
                cursor: 'pointer',
                border: statusFilter === status ? `2px solid ${getStatusColor(status).border}` : '1px solid #dee2e6',
                backgroundColor: statusFilter === status ? getStatusColor(status).bg : '#fff'
              }}
            >
              <div className="card-body py-2 px-1">
                <h5 className="fw-bold mb-1" style={{ color: getStatusColor(status).text }}>
                  {orderCounts[status] || 0}
                </h5>
                <small className="text-muted" style={{ fontSize: '11px' }}>{status}</small>
              </div>
            </div>
          </div>
        ))}
        <div className="col-md-2 col-4 mb-2">
          <div 
            className="card text-center cursor-pointer"
            onClick={() => setStatusFilter('All')}
            style={{ 
              cursor: 'pointer',
              border: statusFilter === 'All' ? '2px solid #003366' : '1px solid #dee2e6',
              backgroundColor: statusFilter === 'All' ? '#e7f3ff' : '#fff'
            }}
          >
            <div className="card-body py-2 px-1">
              <h5 className="fw-bold mb-1" style={{ color: '#003366' }}>{orders.length}</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>All Orders</small>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div className="d-flex align-items-center">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-box-seam me-2"></i>
              {statusFilter === 'All' ? 'All Orders' : `${statusFilter} Orders`}
            </h5>
            <span className="badge bg-primary ms-2">{filteredOrders.length}</span>
          </div>
          <div className="position-relative" style={{ minWidth: '300px' }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input 
              type="text" 
              className="form-control ps-5 rounded-pill border-primary-subtle shadow-none" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="card-body p-0 overflow-hidden">
          <div className="table-responsive" style={{ maxHeight: '700px', overflowY: 'auto' }}>
            <table className="table table-hover mb-0">
              <thead className="table-light sticky-top shadow-sm" style={{ zIndex: 10, top: '-1px' }}>
                <tr>
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Items</th>
                  <th className="py-3">Total</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Payment</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusColors = getStatusColor(order.status);
                  return (
                    <tr key={order._id}>
                      <td>
                        <small className="font-monospace">#{order._id.slice(-8).toUpperCase()}</small>
                      </td>
                      <td>
                        <div>
                          <strong>{order.user?.name || 'Unknown'}</strong>
                          <small className="d-block text-muted">{order.user?.email}</small>
                        </div>
                      </td>
                      <td>
                        <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                        <small className="d-block text-muted">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{order.orderItems.length}</span>
                      </td>
                      <td>
                        <strong>{formatCurrencyDisplay(order.totalPrice)}</strong>
                      </td>
                      <td>
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
                      </td>
                      <td>
                        <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning'}`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => viewOrderDetails(order)}
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <p className="text-muted mt-2">No {statusFilter !== 'All' ? statusFilter : ''} orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Order Details <small className="text-muted">#{selectedOrder._id.slice(-8).toUpperCase()}</small>
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowOrderModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Status Update Section */}
                <div className="card border-0 bg-light mb-3">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Update Order Status</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => {
                        const colors = getStatusColor(status);
                        const isCurrent = selectedOrder.status === status;
                        return (
                          <button
                            key={status}
                            className={`btn btn-sm ${isCurrent ? 'fw-bold' : ''}`}
                            style={{
                              backgroundColor: isCurrent ? colors.border : colors.bg,
                              color: isCurrent ? '#fff' : colors.text,
                              border: `1px solid ${colors.border}`
                            }}
                            onClick={() => updateOrderStatus(selectedOrder._id, status)}
                            disabled={updatingStatus || isCurrent}
                          >
                            {updatingStatus && !isCurrent ? (
                              <span className="spinner-border spinner-border-sm me-1"></span>
                            ) : (
                              <i className={`bi ${getStatusIcon(status)} me-1`}></i>
                            )}
                            {status}
                            {isCurrent && <i className="bi bi-check ms-1"></i>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Customer Information</h6>
                    <p className="mb-1"><strong>Name:</strong> {selectedOrder.user?.name || 'Unknown'}</p>
                    <p className="mb-1"><strong>Email:</strong> {selectedOrder.user?.email}</p>
                    <p className="mb-0"><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Shipping Address</h6>
                    <p className="mb-1">{selectedOrder.shippingAddress.address}</p>
                    <p className="mb-1">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                    <p className="mb-0">{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Order Items */}
                <h6 className="fw-bold mb-2">Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                className="rounded me-2"
                              />
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrencyDisplay(item.price)}</td>
                          <td>{formatCurrencyDisplay(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Order Summary */}
                <div className="card bg-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Items:</span>
                      <span>{formatCurrencyDisplay(selectedOrder.itemsPrice)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Shipping:</span>
                      <span>{formatCurrencyDisplay(selectedOrder.shippingPrice)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Tax:</span>
                      <span>{formatCurrencyDisplay(selectedOrder.taxPrice)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span className="text-primary">{formatCurrencyDisplay(selectedOrder.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowOrderModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
