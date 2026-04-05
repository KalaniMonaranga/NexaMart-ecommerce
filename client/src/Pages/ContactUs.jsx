import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ContactUs = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'send');

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // My Messages state
  const [myMessages, setMyMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchMyMessages = async () => {
    if (!user) return;
    setMessagesLoading(true);
    setMessagesError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/messages/my-messages', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMyMessages(data);
      } else {
        setMessagesError('Failed to load your messages. Please try again.');
      }
    } catch {
      setMessagesError('Could not connect to server.');
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMyMessages();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('✅ Message sent successfully! We will get back to you soon.');
        setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      'Open': 'bg-warning text-dark',
      'In Progress': 'bg-info text-dark',
      'Resolved': 'bg-success',
      'Closed': 'bg-secondary',
    };
    return <span className={`badge ${map[status] || 'bg-secondary'}`}>{status}</span>;
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #003366 0%, #00558a 100%)' }}>
        <h1 className="fw-bold mb-2">
          <i className="bi bi-headset me-2"></i>Contact & Support
        </h1>
        <p className="mb-0 opacity-75">We're here to help. Send us a message and track admin replies.</p>
      </div>

      <div className="container py-5">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4 border-0">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold px-4 ${activeTab === 'send' ? 'active' : ''}`}
              style={activeTab === 'send' ? { color: '#003366', borderBottom: '3px solid #003366' } : { color: '#6c757d' }}
              onClick={() => setActiveTab('send')}
            >
              <i className="bi bi-send me-2"></i>Send Message
            </button>
          </li>
          {user && (
            <li className="nav-item">
              <button
                className={`nav-link fw-bold px-4 ${activeTab === 'messages' ? 'active' : ''}`}
                style={activeTab === 'messages' ? { color: '#003366', borderBottom: '3px solid #003366' } : { color: '#6c757d' }}
                onClick={() => setActiveTab('messages')}
              >
                <i className="bi bi-inbox me-2"></i>My Messages
                {myMessages.filter(m => m.replies && m.replies.length > 0).length > 0 && (
                  <span className="badge bg-danger ms-2">
                    {myMessages.filter(m => m.replies && m.replies.length > 0).length}
                  </span>
                )}
              </button>
            </li>
          )}
        </ul>

        {/* ── SEND MESSAGE TAB ── */}
        {activeTab === 'send' && (
          <div className="row g-4">
            {/* Shop Info Card */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4" style={{ color: '#003366' }}>
                    <i className="bi bi-shop me-2"></i>NexaMart Online Shop
                  </h5>

                  <div className="mb-3">
                    <h6 className="fw-bold"><i className="bi bi-geo-alt me-2 text-primary"></i>Address</h6>
                    <p className="text-muted mb-0">123 Main Street<br />Colombo, Sri Lanka<br />Postal Code: 00100</p>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <h6 className="fw-bold"><i className="bi bi-envelope me-2 text-primary"></i>Email</h6>
                    <p className="text-muted mb-0">
                      <a href="mailto:support@nexamart.com" className="text-decoration-none">support@nexamart.com</a><br />
                      <a href="mailto:info@nexamart.com" className="text-decoration-none">info@nexamart.com</a>
                    </p>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <h6 className="fw-bold"><i className="bi bi-telephone me-2 text-primary"></i>Phone</h6>
                    <p className="text-muted mb-0">+94 11 234 5678<br />+94 77 123 4567</p>
                  </div>
                  <hr />
                  <div>
                    <h6 className="fw-bold"><i className="bi bi-clock me-2 text-primary"></i>Business Hours</h6>
                    <p className="text-muted mb-0">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Send Message Form */}
            <div className="col-md-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 border-bottom">
                  <h5 className="fw-bold mb-0" style={{ color: '#003366' }}>
                    <i className="bi bi-chat-dots me-2"></i>Send Us a Message
                  </h5>
                </div>
                <div className="card-body p-4">
                  {success && (
                    <div className="alert alert-success alert-dismissible fade show">
                      {success}
                      <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show">
                      <i className="bi bi-exclamation-triangle me-2"></i>{error}
                      <button type="button" className="btn-close" onClick={() => setError('')}></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          readOnly={!!user}
                          style={user ? { backgroundColor: '#f8f9fa' } : {}}
                        />
                        {user && <small className="text-muted">Using your account email</small>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                    </div>

                    {user && (
                      <div className="alert alert-info py-2 mb-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Admin replies will be visible in your <strong>My Messages</strong> tab above.
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}
                      style={{ backgroundColor: '#003366', borderColor: '#003366' }}>
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</>
                      ) : (
                        <><i className="bi bi-send me-2"></i>Send Message</>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MY MESSAGES TAB ── */}
        {activeTab === 'messages' && user && (
          <div className="row g-4">
            {/* Messages List */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-0" style={{ color: '#003366' }}>
                    <i className="bi bi-inbox me-2"></i>Your Messages ({myMessages.length})
                  </h6>
                  <button className="btn btn-sm btn-outline-primary" onClick={fetchMyMessages}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="card-body p-0">
                  {messagesLoading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary spinner-border-sm"></div>
                      <p className="text-muted small mt-2">Loading messages...</p>
                    </div>
                  ) : messagesError ? (
                    <div className="p-3 text-center text-danger small">{messagesError}</div>
                  ) : myMessages.length === 0 ? (
                    <div className="text-center py-5 px-3">
                      <i className="bi bi-chat-square display-4 text-muted"></i>
                      <p className="text-muted mt-2 small">You haven't sent any messages yet.</p>
                      <button className="btn btn-sm btn-primary" onClick={() => setActiveTab('send')}>
                        Send a Message
                      </button>
                    </div>
                  ) : (
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                      {myMessages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`p-3 border-bottom ${selectedMsg?._id === msg._id ? 'bg-light' : ''}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedMsg(msg)}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <p className="fw-bold mb-0 small text-truncate me-2" style={{ maxWidth: '150px' }}>
                              {msg.subject}
                            </p>
                            {getStatusBadge(msg.status)}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">{new Date(msg.createdAt).toLocaleDateString()}</small>
                            {msg.replies && msg.replies.length > 0 ? (
                              <span className="badge bg-success">
                                <i className="bi bi-reply me-1"></i>{msg.replies.length} Repl{msg.replies.length > 1 ? 'ies' : 'y'}
                              </span>
                            ) : (
                              <span className="badge bg-light text-muted border">Pending</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message Detail + Replies */}
            <div className="col-md-8">
              {selectedMsg ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0" style={{ color: '#003366' }}>
                      <i className="bi bi-envelope-open me-2"></i>Message Details
                    </h6>
                    {getStatusBadge(selectedMsg.status)}
                  </div>
                  <div className="card-body p-4">
                    {/* Original Message */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fw-bold mb-0">Subject: {selectedMsg.subject}</h6>
                        <small className="text-muted">{new Date(selectedMsg.createdAt).toLocaleString()}</small>
                      </div>
                      <div className="p-3 rounded" style={{ backgroundColor: '#e8f4fd', borderLeft: '4px solid #003366' }}>
                        <div className="d-flex align-items-center mb-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                            style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                            <span className="fw-bold">{selectedMsg.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="fw-bold small">You ({selectedMsg.name})</span>
                        </div>
                        <p className="mb-0 small">{selectedMsg.message}</p>
                      </div>
                    </div>

                    {/* Admin Replies */}
                    {selectedMsg.replies && selectedMsg.replies.length > 0 ? (
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">
                          <i className="bi bi-chat-left-text me-2 text-success"></i>
                          Admin Replies ({selectedMsg.replies.length})
                        </h6>
                        {selectedMsg.replies.map((reply, index) => (
                          <div key={index} className="p-3 rounded mb-3"
                            style={{ backgroundColor: '#f0fdf4', borderLeft: '4px solid #28a745' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-2"
                                  style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                  <i className="bi bi-shield-check" style={{ fontSize: '14px' }}></i>
                                </div>
                                <span className="fw-bold small text-success">
                                  {reply.adminName} <span className="badge bg-success ms-1" style={{ fontSize: '10px' }}>Admin</span>
                                </span>
                              </div>
                              <small className="text-muted">{new Date(reply.createdAt).toLocaleString()}</small>
                            </div>
                            <p className="mb-0 small">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-light rounded mb-4">
                        <i className="bi bi-hourglass-split display-6 text-muted"></i>
                        <p className="text-muted mt-2 mb-0">No admin reply yet. We'll respond soon!</p>
                        <small className="text-muted">Status: <strong>{selectedMsg.status}</strong></small>
                      </div>
                    )}

                    {/* Back button */}
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedMsg(null)}>
                      <i className="bi bi-arrow-left me-1"></i>Back to list
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <i className="bi bi-envelope-open display-1 text-muted"></i>
                    <p className="text-muted mt-3 mb-1">Select a message from the list to view details and admin replies.</p>
                    <small className="text-muted">Admin replies will appear here once your message is answered.</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
