import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, // URL to the group image
    default: "/avatar.png"   // optional: use a default group image URL
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'member'], default: 'member' }
  }],
  accessControl: {
    type: String,
    enum: ['creatorOnly', 'admins', 'all'],
    default: 'creatorOnly'
  }
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);
export default Group;
