import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AccountPage = () => {
  const { user } = useAuth();

  // 1. Safety Check: If user isn't loaded yet, don't crash the app
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="hmart-theme">
      {/* 2. Hmart Style Page Banner */}
      <div className="page-banner mb-5 py-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <h2 className="fw-bold text-navy">My Account</h2>
          <p className="text-muted">HOME // <span className="text-navy">ACCOUNT</span></p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-0 overflow-hidden">
              {/* 3. Navy Blue Branding Section */}
              <div className="p-5 text-center text-white" style={{ backgroundColor: '#003366' }}>
                <div className="mb-3">
                  <i className="fa fa-user-circle" style={{ fontSize: '80px' }}></i>
                </div>
                <h2 className="mt-3 fw-bold">{user.name}</h2>
                <span className="badge bg-light rounded-pill px-3 py-2" style={{ color: '#003366' }}>
                  {user.role === 'admin' ? '🛡️ SYSTEM ADMIN' : 'CUSTOMER'}
                </span>
              </div>

              <div className="card-body p-5 bg-white">
                <div className="row g-4 text-center">
                  {/* Information Section */}
                  <div className="col-md-6 border-end">
                    <h6 className="text-muted text-uppercase small fw-bold">Email Address</h6>
                    <p className="lead fw-normal" style={{ color: '#333333' }}>{user.email}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-muted text-uppercase small fw-bold">Default Address</h6>
                    <p className="lead fw-normal" style={{ color: '#333333' }}>{user.address || 'Colombo, Sri Lanka'}</p>
                  </div>
                </div>

                <div className="mt-5 d-grid gap-3">
                  {/* 4. Admin Link using Sky Blue (#00AEEF) */}
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-lg rounded-0 shadow-sm fw-bold text-white" 
                          style={{ backgroundColor: '#00AEEF' }}>
                      <i className="fa fa-tachometer-alt me-2"></i> Manage NexaMart Inventory
                    </Link>
                  )}
                  
                  <button className="btn btn-outline-danger btn-lg rounded-0 fw-bold">
                    <i className="fa fa-sign-out-alt me-2"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;