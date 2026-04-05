const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ['customer', 'admin', 'auto'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isAutoReply: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
    status: {
      type: String,
      enum: ['active', 'closed', 'pending'],
      default: 'active',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    isReadByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
chatSchema.index({ user: 1 });
chatSchema.index({ status: 1, lastMessageAt: -1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
