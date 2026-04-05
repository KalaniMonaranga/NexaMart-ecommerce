import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoReplyOptions, setAutoReplyOptions] = useState([]);
  const [showAutoReplies, setShowAutoReplies] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const API_URL = 'http://localhost:5000/api/chat';

  // Auto-reply questions
  const quickQuestions = [
    { question: 'Order Status', keyword: 'order status' },
    { question: 'Delivery Time', keyword: 'delivery time' },
    { question: 'Return Policy', keyword: 'return policy' },
    { question: 'Payment Methods', keyword: 'payment methods' },
    { question: 'Track Order', keyword: 'track order' },
    { question: 'Cancel Order', keyword: 'cancel order' },
    { question: 'Shipping Cost', keyword: 'shipping cost' },
    { question: 'Help', keyword: 'help' },
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat history when opened
  useEffect(() => {
    if (isOpen && user) {
      fetchChatHistory();
    }
  }, [isOpen, user]);

  // Polling for new messages every 5 seconds when chat is open
  useEffect(() => {
    let interval;
    if (isOpen && user) {
      interval = setInterval(() => {
        fetchChatHistory();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isOpen, user]);

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/my-chat`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !user) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setInputText('');
        setShowAutoReplies(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickQuestion = (keyword) => {
    sendMessage(keyword);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowAutoReplies(false);
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAutoReplies(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div ref={chatContainerRef}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="card shadow-lg border-0"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: 1050,
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            className="card-header text-white d-flex justify-content-between align-items-center"
            style={{
              background: 'linear-gradient(135deg, #003366 0%, #004080 100%)',
              borderRadius: '16px 16px 0 0',
              padding: '15px 20px',
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="bi bi-headset text-primary fs-5"></i>
              </div>
              <div>
                <h6 className="mb-0 fw-bold">Customer Support</h6>
                <small className="opacity-75">
                  <i className="bi bi-circle-fill text-success me-1" style={{ fontSize: '8px' }}></i>
                  Online
                </small>
              </div>
            </div>
            <button
              className="btn btn-link text-white p-0"
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-x-lg fs-5"></i>
            </button>
          </div>

          {/* Messages */}
          <div
            className="card-body"
            style={{
              height: '330px',
              overflowY: 'auto',
              backgroundColor: '#f8f9fa',
              padding: '15px',
            }}
          >
            {!user ? (
              <div className="text-center py-4">
                <i className="bi bi-person-lock display-4 text-muted"></i>
                <p className="text-muted mt-3">
                  Please <a href="/login">login</a> to chat with support.
                </p>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="text-center py-4">
                    <i className="bi bi-chat-dots display-4 text-muted"></i>
                    <p className="text-muted mt-2">Start a conversation with our support team!</p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 d-flex ${
                      msg.sender === 'customer' ? 'justify-content-end' : 'justify-content-start'
                    }`}
                  >
                    {msg.sender !== 'customer' && (
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                        style={{ width: '32px', height: '32px' }}
                      >
                        {msg.sender === 'admin' ? (
                          <i className="bi bi-headset" style={{ fontSize: '14px' }}></i>
                        ) : (
                          <i className="bi bi-robot" style={{ fontSize: '14px' }}></i>
                        )}
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-3 ${
                        msg.sender === 'customer'
                          ? 'bg-primary text-white'
                          : msg.isAutoReply
                          ? 'bg-info text-white'
                          : 'bg-white border'
                      }`}
                      style={{
                        maxWidth: '75%',
                        borderRadius: msg.sender === 'customer' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      }}
                    >
                      <p className="mb-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                        {msg.text}
                      </p>
                      <small
                        className={`d-block text-end ${
                          msg.sender === 'customer' ? 'text-white-50' : 'text-muted'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {formatTime(msg.timestamp)}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Quick Questions */}
          {user && (
            <div
              className="px-3 py-2 border-top"
              style={{ backgroundColor: '#fff' }}
            >
              <button
                className="btn btn-sm btn-outline-primary w-100 mb-2"
                onClick={() => setShowAutoReplies(!showAutoReplies)}
              >
                <i className="bi bi-lightning-charge me-2"></i>
                {showAutoReplies ? 'Hide' : 'Quick Questions'}
              </button>

              {showAutoReplies && (
                <div className="d-flex flex-wrap gap-1">
                  {quickQuestions.map((item, index) => (
                    <button
                      key={index}
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuickQuestion(item.keyword)}
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input */}
          {user && (
            <div
              className="card-footer border-0 p-3"
              style={{ backgroundColor: '#fff' }}
            >
              <form onSubmit={handleSend} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={loading}
                  style={{ borderRadius: '20px' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  disabled={loading || !inputText.trim()}
                  style={{ width: '42px', height: '42px', padding: 0 }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <i className="bi bi-send-fill"></i>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          zIndex: 1049,
          background: 'linear-gradient(135deg, #003366 0%, #004080 100%)',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0, 51, 102, 0.4)',
        }}
      >
        {isOpen ? (
          <i className="bi bi-x-lg fs-4"></i>
        ) : (
          <i className="bi bi-chat-dots-fill fs-4"></i>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
