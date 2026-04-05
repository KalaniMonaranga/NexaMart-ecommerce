import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [showTempPassword, setShowTempPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setTempPassword('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
        email
      });

      setMessage(response.data.message);
      setTempPassword(response.data.tempPassword); // For development only
      setShowTempPassword(true);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send temporary password');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tempPassword);
    alert('Temporary password copied to clipboard!');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Logo Section */}
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <h1 className="fw-bold" style={{ color: '#003366' }}>
                  NEXA<span style={{ color: '#00AEEF' }}>MART</span>
                </h1>
              </Link>
              <p className="text-muted">Reset your password</p>
            </div>

            {/* Forgot Password Form Card */}
            <div className="card shadow-lg border-0 rounded-0 overflow-hidden">
              {/* Header */}
              <div className="p-4 text-center text-white" style={{ backgroundColor: '#003366' }}>
                <i className="bi bi-key-fill fs-1 mb-2"></i>
                <h3 className="fw-bold mb-0">Forgot Password</h3>
                <p className="mb-0 small">Enter your email to receive a temporary password</p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 bg-white">
                {message && (
                  <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                    <i className={`bi ${message.includes('sent') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                  </div>
                )}

                {!showTempPassword ? (
                  <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-uppercase">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input 
                          type="email" 
                          className="form-control rounded-0"
                          placeholder="Enter your registered email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="btn btn-lg w-100 rounded-0 fw-bold text-white py-3"
                      style={{ backgroundColor: '#00AEEF' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          SEND TEMPORARY PASSWORD
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                    </div>
                    
                    <h5 className="fw-bold mb-3">Temporary Password Generated!</h5>
                    
                    <div className="alert alert-info">
                      <p className="mb-2">
                        <strong>For Development:</strong> Check the server console or use the password below:
                      </p>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <code className="fs-5 fw-bold text-primary">{tempPassword}</code>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={copyToClipboard}
                          title="Copy to clipboard"
                        >
                          <i className="bi bi-clipboard"></i>
                        </button>
                      </div>
                    </div>

                    <div className="alert alert-warning">
                      <small>
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Note:</strong> In production, this password would be sent to your email address.
                        The temporary password will expire in 24 hours.
                      </small>
                    </div>

                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary rounded-0"
                        onClick={() => navigate('/reset-password')}
                      >
                        <i className="bi bi-arrow-right me-2"></i>
                        Go to Password Reset
                      </button>
                      
                      <button 
                        className="btn btn-outline-secondary rounded-0"
                        onClick={() => {
                          setShowTempPassword(false);
                          setMessage('');
                          setTempPassword('');
                        }}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Form
                      </button>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="mt-4 p-3 bg-light rounded-0">
                  <h6 className="fw-bold mb-3" style={{ color: '#003366' }}>How it works:</h6>
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">1</span>
                    <small>Enter your registered email address</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">2</span>
                    <small>Receive a temporary password via email</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">3</span>
                    <small>Login with temporary password and reset it</small>
                  </div>
                </div>

                {/* Back to Login */}
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Remember your password? 
                    <Link to="/login" className="text-decoration-none fw-bold ms-1" style={{ color: '#00AEEF' }}>
                      Sign In Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <small className="text-muted">
                For security reasons, temporary passwords expire in 24 hours
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
