import mongoose from 'mongoose';

const messageGroupSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentType: {
    type: String,
    enum: ["text", "image"],
    required: true
  },
  content: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MessageGroup = mongoose.model('MessageGroup', messageGroupSchema);
export default MessageGroup;
