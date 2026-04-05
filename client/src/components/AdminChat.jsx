import React, { useState, useEffect, useRef } from 'react';

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const messagesEndRef = useRef(null);

  const API_URL = 'http://localhost:5000/api/chat';

  // Fetch all chats
  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // Fetch selected chat details
  const fetchChatDetails = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching chat details:', error);
    }
  };

  // Initial load and polling
  useEffect(() => {
    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
      if (selectedChat) {
        fetchChatDetails(selectedChat._id);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    fetchChatDetails(chat._id);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${selectedChat._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: replyText.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setReplyText('');
        fetchChats(); // Refresh chat list
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseChat = async (chatId) => {
    if (!window.confirm('Are you sure you want to close this chat?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${chatId}/close`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchChats();
        if (selectedChat && selectedChat._id === chatId) {
          setSelectedChat(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Error closing chat:', error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter chats
  const filteredChats = chats.filter((chat) => {
    if (filter === 'all') return true;
    if (filter === 'active') return chat.status === 'active';
    if (filter === 'pending') return chat.status === 'pending';
    if (filter === 'closed') return chat.status === 'closed';
    if (filter === 'unread') return !chat.isReadByAdmin;
    return true;
  });

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Header */}
        <div className="col-12 mb-4">
          <h4 className="fw-bold" style={{ color: '#003366' }}>
            <i className="bi bi-chat-square-text me-2"></i>Customer Chat Support
          </h4>
          <p className="text-muted">Manage customer inquiries and provide support in real-time.</p>
        </div>
      </div>

      <div className="row">
        {/* Chat List */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h6 className="fw-bold mb-3">Filter Chats</h6>
              <div className="btn-group w-100" role="group">
                {['all', 'active', 'unread', 'closed'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="card-body p-0" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredChats.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-inbox display-5 text-muted"></i>
                  <p className="text-muted mt-2">No chats found</p>
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`p-3 border-bottom cursor-pointer ${
                      selectedChat?._id === chat._id ? 'bg-primary-subtle' : ''
                    } ${!chat.isReadByAdmin ? 'border-start border-4 border-primary' : ''}`}
                    onClick={() => handleChatSelect(chat)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <span className="fw-bold">
                            {chat.userName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{chat.userName}</h6>
                          <small className="text-muted">{chat.userEmail}</small>
                        </div>
                      </div>
                      <span
                        className={`badge ${
                          chat.status === 'active'
                            ? 'bg-success'
                            : chat.status === 'pending'
                            ? 'bg-warning'
                            : 'bg-secondary'
                        }`}
                      >
                        {chat.status}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        {formatTime(chat.lastMessageAt)}
                      </small>
                      {!chat.isReadByAdmin && (
                        <span className="badge bg-danger">New</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chat Detail */}
        <div className="col-md-8">
          {selectedChat ? (
            <div className="card border-0 shadow-sm" style={{ height: '600px' }}>
              {/* Chat Header */}
              <div className="card-header bg-white py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <span className="fw-bold fs-5">
                        {selectedChat.userName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0">{selectedChat.userName}</h5>
                      <small className="text-muted">{selectedChat.userEmail}</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleCloseChat(selectedChat._id)}
                  >
                    <i className="bi bi-x-circle me-1"></i>Close Chat
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                className="card-body"
                style={{
                  height: '400px',
                  overflowY: 'auto',
                  backgroundColor: '#f8f9fa',
                }}
              >
                {messages.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No messages yet</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 d-flex ${
                        msg.sender === 'admin'
                          ? 'justify-content-end'
                          : 'justify-content-start'
                      }`}
                    >
                      {msg.sender !== 'admin' && (
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                          style={{ width: '32px', height: '32px' }}
                        >
                          {msg.sender === 'customer' ? (
                            <span style={{ fontSize: '12px' }}>
                              {selectedChat.userName?.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <i className="bi bi-robot" style={{ fontSize: '14px' }}></i>
                          )}
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-3 ${
                          msg.sender === 'admin'
                            ? 'bg-primary text-white'
                            : msg.isAutoReply
                            ? 'bg-info text-white'
                            : 'bg-white border'
                        }`}
                        style={{
                          maxWidth: '70%',
                          borderRadius:
                            msg.sender === 'admin'
                              ? '16px 16px 4px 16px'
                              : '16px 16px 16px 4px',
                        }}
                      >
                        <div className="d-flex align-items-center mb-1">
                          <small className="fw-bold">
                            {msg.sender === 'admin'
                              ? 'You'
                              : msg.sender === 'customer'
                              ? selectedChat.userName
                              : 'Auto-Reply'}
                          </small>
                        </div>
                        <p className="mb-1" style={{ fontSize: '14px' }}>
                          {msg.text}
                        </p>
                        <small
                          className={`d-block ${
                            msg.sender === 'admin' ? 'text-white-50' : 'text-muted'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {formatTime(msg.timestamp)}
                        </small>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div className="card-footer bg-white p-3 border-top">
                <form onSubmit={handleSendReply} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !replyText.trim()}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <>
                        <i className="bi bi-send me-1"></i>Send
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <i className="bi bi-chat-square-text display-1 text-muted mb-3"></i>
                <h5 className="text-muted">Select a chat to view messages</h5>
                <p className="text-muted">
                  Click on a customer from the list to start conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
