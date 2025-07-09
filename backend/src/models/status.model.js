// models/Status.js
import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: String, // Can be image/video URL
  caption: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 },
});

statusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete after 24 hours

export default mongoose.model("Status", statusSchema);
