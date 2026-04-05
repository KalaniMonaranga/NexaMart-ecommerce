const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect, admin } = require('../middleware/authMiddleware');

// Auto-reply questions and answers
const autoReplies = {
  'order status': 'You can check your order status in the "My Orders" section or click on "Order Tracking" in the navigation menu.',
  'delivery time': 'Our standard delivery time is 3-5 business days for local orders and 7-10 business days for international orders.',
  'return policy': 'We offer a 30-day return policy for all unused items. Please visit the "My Orders" page to initiate a return.',
  'payment methods': 'We accept Credit/Debit Cards (Visa, MasterCard), PayPal, and Cash on Delivery for local orders.',
  'track order': 'You can track your order by going to "My Orders" and clicking "Track Order" on your specific order.',
  'cancel order': 'Orders can be cancelled within 1 hour of placing them. Please contact us immediately if you need to cancel.',
  'contact support': 'You can reach our support team through this chat, or email us at support@nexamart.com',
  'shipping cost': 'Shipping is free for orders over Rs. 5000. Standard shipping fee is Rs. 300 for orders below that.',
  'product availability': 'Product availability is shown on each product page. If an item is out of stock, you can sign up for restock notifications.',
  'discount code': 'You can apply discount codes at checkout. Check our homepage for current promotions and offers.',
  'hours': 'Our customer support is available Monday to Saturday, 9 AM to 6 PM.',
  'help': 'I can help you with: order status, delivery time, return policy, payment methods, track order, cancel order, shipping cost, and more. What would you like to know?',
};

// Function to check for auto-reply
const getAutoReply = (message) => {
  const lowerMsg = message.toLowerCase();
  
  for (const [keyword, reply] of Object.entries(autoReplies)) {
    if (lowerMsg.includes(keyword)) {
      return reply;
    }
  }
  
  // Check for greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(lowerMsg)) {
    return 'Hello! Welcome to NexaMart customer support. How can I help you today? You can ask me about order status, delivery, returns, payments, or type "help" for more options.';
  }
  
  // Check for thanks
  if (/thank|thanks/i.test(lowerMsg)) {
    return 'You\'re welcome! Is there anything else I can help you with?';
  }
  
  // Check for goodbye
  if (/bye|goodbye|see you/i.test(lowerMsg)) {
    return 'Thank you for chatting with us! Have a great day!';
  }
  
  return null;
};

// 1. GET CUSTOMER'S CHAT (Customer)
router.get('/my-chat', protect, async (req, res) => {
  try {
    let chat = await Chat.findOne({ user: req.user._id });
    
    if (!chat) {
      // Create new chat if doesn't exist
      chat = await Chat.create({
        user: req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
        messages: [
          {
            sender: 'auto',
            text: `Hello ${req.user.name}! Welcome to NexaMart customer support. How can I help you today? Type "help" to see what I can assist with.`,
            isAutoReply: true,
          },
        ],
      });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('GET CHAT ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 2. SEND MESSAGE (Customer)
router.post('/send', protect, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }
    
    let chat = await Chat.findOne({ user: req.user._id });
    
    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
        messages: [],
      });
    }
    
    // Add customer message
    chat.messages.push({
      sender: 'customer',
      text: text.trim(),
      timestamp: new Date(),
    });
    
    chat.lastMessageAt = new Date();
    chat.isReadByAdmin = false;
    
    // Check for auto-reply
    const autoReplyText = getAutoReply(text);
    if (autoReplyText) {
      chat.messages.push({
        sender: 'auto',
        text: autoReplyText,
        timestamp: new Date(),
        isAutoReply: true,
      });
    }
    
    await chat.save();
    res.json(chat);
  } catch (error) {
    console.error('SEND MESSAGE ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 3. GET ALL CHATS (Admin only)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const chats = await Chat.find({})
      .sort({ lastMessageAt: -1 })
      .select('-messages'); // Don't send all messages, just metadata
    
    res.json(chats);
  } catch (error) {
    console.error('GET ALL CHATS ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 4. GET SINGLE CHAT DETAILS (Admin only)
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Mark as read
    chat.isReadByAdmin = true;
    await chat.save();
    
    res.json(chat);
  } catch (error) {
    console.error('GET CHAT DETAILS ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 5. ADMIN REPLY (Admin only)
router.post('/:id/reply', protect, admin, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Reply text is required' });
    }
    
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Add admin reply
    chat.messages.push({
      sender: 'admin',
      text: text.trim(),
      timestamp: new Date(),
    });
    
    chat.lastMessageAt = new Date();
    chat.isReadByAdmin = true;
    
    await chat.save();
    res.json(chat);
  } catch (error) {
    console.error('ADMIN REPLY ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 6. CLOSE CHAT (Admin only)
router.put('/:id/close', protect, admin, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    chat.status = 'closed';
    await chat.save();
    
    res.json({ message: 'Chat closed successfully' });
  } catch (error) {
    console.error('CLOSE CHAT ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 7. GET AUTO-REPLY OPTIONS (Public)
router.get('/auto-reply-options', async (req, res) => {
  try {
    const options = Object.keys(autoReplies).map((key) => ({
      question: key.charAt(0).toUpperCase() + key.slice(1),
      keyword: key,
    }));
    
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
