import Call from "../models/call.model.js";

// GET /api/calls/history
export const getCallHistory = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const calls = await Call.find({
      $or: [{ caller: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("caller", "name _id")
      .populate("receiver", "name _id");

    res.status(200).json(calls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch call history" });
  }
};
