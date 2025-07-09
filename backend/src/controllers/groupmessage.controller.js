import MessageGroup from '../models/messageGroup.model.js';
import Group from '../models/group.model.js';

// ✅ Post message (called from socket)
export const postMessage = async ({ groupId, senderId, contentType, content, imageUrl }) => {
  const message = await MessageGroup.create({
    group: groupId,
    sender: senderId,
    contentType,
    content,
    imageUrl,
  });

  // 🧠 Populate sender info so frontend can use it
  await message.populate('sender', 'fullName profilePic');
  return message;
};

// ✅ Get all messages in a group
export const getMessages = async (req, res) => {
  const { groupId } = req.params;

  const messages = await MessageGroup.find({ group: groupId })
    .populate('sender', 'fullName profilePic') // ⚠️ This is essential
    .sort({ timestamp: 1 }); // optional: make messages ordered

  res.status(200).json(messages);
};
