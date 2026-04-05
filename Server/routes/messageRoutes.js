const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, admin } = require('../middleware/authMiddleware');

// 1. CREATE MESSAGE (Public - anyone can send)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: createdMessage });
  } catch (error) {
    console.error('CREATE MESSAGE ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 2. GET ALL MESSAGES (Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. GET SINGLE MESSAGE (Admin only)
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. ADD REPLY TO MESSAGE (Admin only)
router.post('/:id/reply', protect, admin, async (req, res) => {
  try {
    const { message: replyMessage } = req.body;
    const message = await Message.findById(req.params.id);

    if (message) {
      const reply = {
        admin: req.user._id,
        adminName: req.user.name,
        message: replyMessage,
      };

      message.replies.push(reply);
      message.status = 'In Progress';
      message.isRead = true;
      
      const updatedMessage = await message.save();
      res.json({ message: 'Reply added successfully', data: updatedMessage });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('REPLY ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// 5. UPDATE MESSAGE STATUS (Admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findById(req.params.id);

    if (message) {
      message.status = status;
      const updatedMessage = await message.save();
      res.json({ message: 'Status updated', data: updatedMessage });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. MARK AS READ (Admin only)
router.put('/:id/read', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = true;
      const updatedMessage = await message.save();
      res.json({ message: 'Marked as read', data: updatedMessage });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 7. DELETE MESSAGE (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (message) {
      await Message.deleteOne({ _id: req.params.id });
      res.json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('DELETE MESSAGE ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
