import Group from '../models/group.model.js';
import User from '../models/user.model.js';
import MessageGroup from '../models/messageGroup.model.js'; 

// Create Group
export const createGroup = async (req, res) => {
  const { name, imageUrl, accessControl, members } = req.body;
  const userId = req.user._id; // assuming auth middleware

  try {
    const group = await Group.create({
      name,
      imageUrl,
      accessControl,
      createdBy: userId,
      members: [{ user: userId, role: 'admin' }, ...(members || [])]
    });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Group creation failed', details: err.message });
  }
};

export const getGroups = async (req, res) => {
  const userId = req.user._id;
  const groups = await Group.find({ "members.user": userId });
  res.status(200).json(groups);
};


// Delete Group (only by creator)
export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  if (!group.createdBy.equals(userId)) {
    return res.status(403).json({ error: 'Only creator can delete this group' });
  }

  await group.deleteOne();
  res.status(200).json({ message: 'Group deleted' });
};

// Add Member (based on accessControl)
export const addMember = async (req, res) => {
  const { groupId } = req.params;
  const { userIdToAdd } = req.body;
  const userId = req.user._id;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const currentUser = group.members.find(m => m.user.equals(userId));
  const isAdmin = currentUser?.role === 'admin';

  const canAdd =
    group.accessControl === 'all' ||
    (group.accessControl === 'admins' && isAdmin) ||
    (group.accessControl === 'creatorOnly' && group.createdBy.equals(userId));

  if (!canAdd) {
    return res.status(403).json({ error: 'You do not have permission to add members' });
  }

  // Avoid duplicates
  if (group.members.some(m => m.user.equals(userIdToAdd))) {
    return res.status(400).json({ error: 'User already a member' });
  }

  group.members.push({ user: userIdToAdd });
  await group.save();
  res.status(200).json(group);
};



export const postMessage = async (req, res) => {
  const { groupId } = req.params;
  const { contentType, content, imageUrl } = req.body;
  const senderId = req.user._id;

  // 🧪 Debugging
  console.log("POST /api/groups/:groupId/messages");
  console.log("Request Body:", req.body);
  console.log("contentType received:", contentType);

  try {
    if (!["text", "image"].includes(contentType)) {
      return res.status(400).json({ error: "Invalid content type. Must be 'text' or 'image'." });
    }

    if (contentType === "text" && !content) {
      return res.status(400).json({ error: "Text content required" });
    }

    if (contentType === "image" && !imageUrl) {
      return res.status(400).json({ error: "Image URL required" });
    }

    const message = await MessageGroup.create({
      group: groupId,
      sender: senderId,
      contentType,
      content: contentType === "text" ? content : null,
      imageUrl: contentType === "image" ? imageUrl : null,
    });

    res.status(201).json(message);
  } catch (err) {
    console.error("Error in postMessage:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

// Get group with full member details
export const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId)
    .populate("members.user", "fullName profilePic email")
    .populate("createdBy", "fullName email");

  if (!group) return res.status(404).json({ error: "Group not found" });
  res.status(200).json(group);
};

// Remove a member (only by creator or admin based on accessControl)
export const removeMember = async (req, res) => {
  const { groupId } = req.params;
  const { userIdToRemove } = req.body;
  const userId = req.user._id;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: "Group not found" });

  const isAdmin = group.members.find(m => m.user.equals(userId))?.role === "admin";
  const canRemove =
    group.accessControl === "all" ||
    (group.accessControl === "admins" && isAdmin) ||
    (group.accessControl === "creatorOnly" && group.createdBy.equals(userId));

  if (!canRemove) return res.status(403).json({ error: "You can't remove members" });

  // Don't allow removing creator
  if (group.createdBy.equals(userIdToRemove)) {
    return res.status(400).json({ error: "Cannot remove the group creator" });
  }

  group.members = group.members.filter(m => !m.user.equals(userIdToRemove));
  await group.save();

  res.status(200).json({ message: "Member removed", group });
};

