import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminMessageManagement = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        const unread = data.filter(m => !m.isRead).length;
        setUnreadCount(unread);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleReply = async (messageId) => {
    if (!replyText.trim()) {
      setError('Please enter a reply');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: replyText }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Reply sent successfully!');
        setReplyText('');
        setSelectedMessage(data.data);
        fetchMessages();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send reply');
      }
    } catch (err) {
      setError('Error sending reply');
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchMessages();
    } catch (err) {
      console.error('Error marking as read');
    }
  };

  const updateStatus = async (messageId, status) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/messages/${messageId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchMessages();
    } catch (err) {
      console.error('Error updating status');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      setError('Error deleting message');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Open': 'bg-warning text-dark',
      'In Progress': 'bg-info text-dark',
      'Resolved': 'bg-success',
      'Closed': 'bg-secondary'
    };
    return <span className={`badge ${colors[status] || 'bg-secondary'}`}>{status}</span>;
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'open') return msg.status === 'Open';
    if (filter === 'resolved') return msg.status === 'Resolved';
    return true;
  });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold" style={{ color: '#003366' }}>
              <i className="bi bi-envelope-fill me-2"></i>
              Message Management
              {unreadCount > 0 && (
                <span className="badge bg-danger ms-2">{unreadCount} new</span>
              )}
            </h2>
            <button className="btn btn-outline-primary" onClick={fetchMessages}>
              <i className="bi bi-arrow-clockwise me-1"></i>Refresh
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show mt-3">
              <i className="bi bi-exclamation-triangle me-2"></i>{error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show mt-3">
              <i className="bi bi-check-circle me-2"></i>{success}
              <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
            </div>
          )}
        </div>

        <div className="col-12 mb-3">
          <div className="btn-group">
            <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>
              All ({messages.length})
            </button>
            <button className={`btn ${filter === 'unread' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('unread')}>
              Unread ({messages.filter(m => !m.isRead).length})
            </button>
            <button className={`btn ${filter === 'open' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('open')}>
              Open ({messages.filter(m => m.status === 'Open').length})
            </button>
            <button className={`btn ${filter === 'resolved' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('resolved')}>
              Resolved ({messages.filter(m => m.status === 'Resolved').length})
            </button>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">Messages ({filteredMessages.length})</h5>
            </div>
            <div className="card-body p-0">
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-inbox display-4 text-muted"></i>
                    <p className="text-muted mt-2">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-3 border-bottom cursor-pointer ${selectedMessage?._id === message._id ? 'bg-light' : ''} ${!message.isRead ? 'bg-info bg-opacity-10' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.isRead) markAsRead(message._id);
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="fw-bold mb-0">{message.name}</h6>
                        {!message.isRead && <span className="badge bg-danger">New</span>}
                      </div>
                      <p className="text-muted small mb-1 text-truncate">{message.subject}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{new Date(message.createdAt).toLocaleDateString()}</small>
                        {getStatusBadge(message.status)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          {selectedMessage ? (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Message Details</h5>
                <div>
                  <button className="btn btn-sm btn-outline-danger me-2" onClick={() => deleteMessage(selectedMessage._id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <select className="form-select form-select-sm d-inline-block w-auto" value={selectedMessage.status} onChange={(e) => updateStatus(selectedMessage._id, e.target.value)}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h6 className="fw-bold">From:</h6>
                  <div className="d-flex align-items-center mb-2">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">{selectedMessage.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">{selectedMessage.name}</p>
                      <small className="text-muted"><i className="bi bi-envelope me-1"></i>{selectedMessage.email}</small>
                    </div>
                  </div>
                  <p className="text-muted small mb-0"><i className="bi bi-calendar me-1"></i>{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold">Subject:</h6>
                  <p className="mb-0">{selectedMessage.subject}</p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold">Message:</h6>
                  <div className="p-3 bg-light rounded">
                    <p className="mb-0">{selectedMessage.message}</p>
                  </div>
                </div>

                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-bold">Replies:</h6>
                    {selectedMessage.replies.map((reply, index) => (
                      <div key={index} className="p-3 bg-success bg-opacity-10 rounded mb-2">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="fw-bold text-success">{reply.adminName} (Admin)</span>
                          <small className="text-muted">{new Date(reply.createdAt).toLocaleString()}</small>
                        </div>
                        <p className="mb-0">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-3">
                  <h6 className="fw-bold">Send Reply:</h6>
                  <textarea className="form-control mb-3" rows="4" placeholder="Type your reply here..." value={replyText} onChange={(e) => setReplyText(e.target.value)}></textarea>
                  <button className="btn btn-primary" onClick={() => handleReply(selectedMessage._id)}>
                    <i className="bi bi-reply me-2"></i>Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-envelope-open display-1 text-muted"></i>
                <p className="text-muted mt-3">Select a message to view details and reply</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessageManagement;
