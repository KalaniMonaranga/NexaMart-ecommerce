import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Page Header */}
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#003366' }}>
            <i className="bi bi-envelope-fill me-2"></i>Contact Us
          </h1>
          <p className="text-muted">We'd love to hear from you. Send us a message!</p>
        </div>

        {/* Shop Details */}
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-4" style={{ color: '#003366' }}>
                <i className="bi bi-shop me-2"></i>NexaMart Online Shop
              </h5>
              
              <div className="mb-3">
                <h6 className="fw-bold"><i className="bi bi-geo-alt me-2 text-primary"></i>Address</h6>
                <p className="text-muted mb-0">
                  123 Main Street<br />
                  Colombo, Sri Lanka<br />
                  Postal Code: 00100
                </p>
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
                <p className="text-muted mb-0">
                  +94 11 234 5678<br />
                  +94 77 123 4567
                </p>
              </div>

              <hr />

              <div className="mb-0">
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

        {/* Message Form */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0" style={{ color: '#003366' }}>
                <i className="bi bi-chat-dots me-2"></i>Send Us a Message
              </h5>
            </div>
            <div className="card-body">
              {success && (
                <div className="alert alert-success alert-dismissible fade show">
                  <i className="bi bi-check-circle me-2"></i>{success}
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
                    />
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

                <div className="mb-3">
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

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Placeholder) */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div 
                className="bg-light d-flex align-items-center justify-content-center" 
                style={{ height: '300px' }}
              >
                <div className="text-center">
                  <i className="bi bi-map display-1 text-muted"></i>
                  <p className="text-muted mt-2">Map Location</p>
                  <p className="text-muted small">123 Main Street, Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
