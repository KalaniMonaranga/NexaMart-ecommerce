const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    adminName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const messageSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    replies: [replySchema],
    isRead: { type: Boolean, default: false },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
