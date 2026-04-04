import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      login(data);
      alert('✅ Registration Successful! Welcome to NexaMart!');
      navigate('/shop');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Registration failed. Try again.' });
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
              <p className="text-muted">Join Sri Lanka's Premier E-Commerce Platform</p>
            </div>

            {/* Register Form Card */}
            <div className="card shadow-lg border-0 rounded-0 overflow-hidden">
              {/* Header */}
              <div className="p-4 text-center text-white" style={{ backgroundColor: '#003366' }}>
                <i className="bi bi-person-plus-fill fs-1 mb-2"></i>
                <h3 className="fw-bold mb-0">Create Account</h3>
                <p className="mb-0 small">Register for a better shopping experience</p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 bg-white">
                {errors.submit && (
                  <div className="alert alert-danger rounded-0" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-person"></i>
                      </span>
                      <input 
                        type="text" 
                        className={`form-control rounded-0 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>

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

                  {/* Password Field */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase">Password</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-lock"></i>
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"}
                        className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                      <button 
                        className="btn btn-outline-secondary rounded-0"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text rounded-0" style={{ backgroundColor: '#003366', color: 'white' }}>
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        CREATE ACCOUNT
                      </>
                    )}
                  </button>
                </form>

                {/* Benefits Section */}
                <div className="mt-4 p-3 bg-light rounded-0">
                  <h6 className="fw-bold mb-3" style={{ color: '#003366' }}>Why Join NexaMart?</h6>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Exclusive deals and discounts</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Faster checkout process</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <small>Order tracking and history</small>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account? 
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
                By registering, you agree to our Terms of Service and Privacy Policy
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
