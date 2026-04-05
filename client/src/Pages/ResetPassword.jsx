import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!tempPassword) newErrors.tempPassword = 'Temporary password is required';
    
    if (!newPassword) newErrors.newPassword = 'New password is required';
    if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', {
        email,
        tempPassword,
        newPassword
      });

      setMessage(response.data.message);
      
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
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

            {/* Reset Password Form Card */}
            <div className="card shadow-lg border-0 rounded-0 overflow-hidden">
              {/* Header */}
              <div className="p-4 text-center text-white" style={{ backgroundColor: '#003366' }}>
                <i className="bi bi-shield-lock-fill fs-1 mb-2"></i>
                <h3 className="fw-bold mb-0">Reset Password</h3>
                <p className="mb-0 small">Set your new password</p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 bg-white">
                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                    <i className={`bi ${message.includes('success') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input 
                        type="email" 
                        className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  {/* Temporary Password Field */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase">Temporary Password</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-key"></i>
                      </span>
                      <input 
                        type="text"
                        className={`form-control rounded-0 ${errors.tempPassword ? 'is-invalid' : ''}`}
                        placeholder="Enter temporary password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        required 
                      />
                    </div>
                    {errors.tempPassword && <div className="invalid-feedback d-block">{errors.tempPassword}</div>}
                  </div>

                  {/* New Password Field */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase">New Password</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-lock"></i>
                      </span>
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        className={`form-control rounded-0 ${errors.newPassword ? 'is-invalid' : ''}`}
                        placeholder="Create new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required 
                      />
                      <button 
                        className="btn btn-outline-secondary rounded-0"
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                    {errors.newPassword && <div className="invalid-feedback d-block">{errors.newPassword}</div>}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase">Confirm New Password</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                      <button 
                        className="btn btn-outline-secondary rounded-0"
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
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
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-shield-check me-2"></i>
                        RESET PASSWORD
                      </>
                    )}
                  </button>
                </form>

                {/* Password Requirements */}
                <div className="mt-4 p-3 bg-light rounded-0">
                  <h6 className="fw-bold mb-3" style={{ color: '#003366' }}>Password Requirements:</h6>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>At least 6 characters long</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Contains letters and numbers</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Easy to remember but hard to guess</small>
                  </div>
                </div>

                {/* Back Links */}
                <div className="text-center mt-4">
                  <div className="mb-2">
                    <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#00AEEF' }}>
                      <i className="bi bi-arrow-left me-1"></i>
                      Request another temporary password
                    </Link>
                  </div>
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
                Your password is encrypted and stored securely
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
