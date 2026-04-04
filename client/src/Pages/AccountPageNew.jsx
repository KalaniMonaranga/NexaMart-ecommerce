import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(user?.profilePic || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Safety Check: If user isn't loaded yet, don't crash the app
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading your profile...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate new password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage('New passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setMessage('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }
      }

      // Prepare update data
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        profilePic: profileImage
      };

      // Add password update if provided
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await updateUser(updateData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setProfileImage(user?.profilePic || '');
    setMessage('');
  };

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
          <div className="col-md-10">
            <div className="card shadow-lg border-0 rounded-0 overflow-hidden">
              {/* 3. Navy Blue Branding Section */}
              <div className="p-5 text-center text-white" style={{ backgroundColor: '#003366' }}>
                <div className="mb-3">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="rounded-circle border border-3 border-white"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person-circle" style={{ fontSize: '120px' }}></i>
                  )}
                </div>
                <h2 className="mt-3 fw-bold">{user.name}</h2>
                <p className="mb-2">{user.email}</p>
                <span className="badge bg-light rounded-pill px-3 py-2" style={{ color: '#003366' }}>
                  {user.role === 'admin' ? '🛡️ SYSTEM ADMIN' : '🛍️ CUSTOMER'}
                </span>
              </div>

              <div className="card-body p-5 bg-white">
                {/* Success/Error Message */}
                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                  </div>
                )}

                {!isEditing ? (
                  // View Mode
                  <div>
                    <div className="row g-4 mb-4">
                      {/* Information Section */}
                      <div className="col-md-6 border-end">
                        <h6 className="text-muted text-uppercase small fw-bold">Login Email</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-envelope me-2"></i>{user.email}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-muted text-uppercase small fw-bold">Phone Number</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-telephone me-2"></i>{user.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6 border-end">
                        <h6 className="text-muted text-uppercase small fw-bold">Full Name</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-person me-2"></i>{user.name}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-muted text-uppercase small fw-bold">Default Address</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-geo-alt me-2"></i>{user.address || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6 border-end">
                        <h6 className="text-muted text-uppercase small fw-bold">Account Type</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-shield-check me-2"></i>{user.role === 'admin' ? 'Administrator' : 'Customer'}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-muted text-uppercase small fw-bold">Member Since</h6>
                        <p className="lead fw-normal" style={{ color: '#333333' }}>
                          <i className="bi bi-calendar me-2"></i>{new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 d-grid gap-3 d-md-flex justify-content-md-end">
                      <button 
                        className="btn btn-primary btn-lg rounded-0 fw-bold"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="bi bi-pencil-square me-2"></i> Edit Profile
                      </button>
                      
                      {/* 4. Admin Link using Sky Blue (#00AEEF) */}
                      {user.role === 'admin' && (
                        <Link to="/admin" className="btn btn-lg rounded-0 shadow-sm fw-bold text-white" 
                              style={{ backgroundColor: '#00AEEF' }}>
                          <i className="bi bi-gear me-2"></i> Admin Panel
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Full Name</label>
                        <input
                          type="text"
                          className="form-control rounded-0"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Email (Login)</label>
                        <input
                          type="email"
                          className="form-control rounded-0"
                          value={formData.email}
                          disabled
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                        <small className="text-muted">Email cannot be changed</small>
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control rounded-0"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Address</label>
                        <input
                          type="text"
                          className="form-control rounded-0"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Colombo, Sri Lanka"
                        />
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Profile Image</label>
                        <input
                          type="file"
                          className="form-control rounded-0"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <small className="text-muted">Upload a new profile picture</small>
                      </div>
                      <div className="col-md-6">
                        {profileImage && (
                          <img 
                            src={profileImage} 
                            alt="Profile Preview" 
                            className="rounded-circle border"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h5 className="fw-bold mb-4">Change Password</h5>

                    <div className="row g-4 mb-4">
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Current Password</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control rounded-0"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                          />
                          <button 
                            className="btn btn-outline-secondary rounded-0"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">New Password</label>
                        <div className="input-group">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control rounded-0"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                          />
                          <button 
                            className="btn btn-outline-secondary rounded-0"
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control rounded-0"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="mt-5 d-grid gap-3 d-md-flex justify-content-md-end">
                      <button 
                        type="button"
                        className="btn btn-outline-secondary btn-lg rounded-0 fw-bold"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        <i className="bi bi-x-circle me-2"></i> Cancel
                      </button>
                      <button 
                        type="submit"
                        className="btn btn-primary btn-lg rounded-0 fw-bold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
