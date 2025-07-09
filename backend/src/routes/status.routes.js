// routes/statusRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";
import Status from "../models/status.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chat-status",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// ✅ POST /api/status
router.post("/", protectRoute, upload.single("file"), async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const status = await Status.create({
      user: req.userId,
      mediaUrl: result.secure_url,
      caption,
      cloudinaryId: result.public_id, // ✅ save this to delete later
    });

    res.status(201).json(status);
  } catch (err) {
    console.error("Status creation error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /api/status
router.get("/", protectRoute, async (req, res) => {
  try {
    const statuses = await Status.find({
      expiresAt: { $gt: new Date() },
    }).populate("user", "_id username fullName profilePic");

    res.json(statuses);
  } catch (err) {
    console.error("Get statuses error:", err);
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
});

// ✅ DELETE /api/status/:id
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (!status) {
      return res.status(404).json({ error: "Status not found" });
    }

    // if (status.user._id.toString() !== req.userId) {
    //   return res.status(403).json({ error: "Unauthorized to delete this status" });
    // }

    if (status.cloudinaryId) {
      await cloudinary.uploader.destroy(status.cloudinaryId); // ✅ now safe
    }

    await status.deleteOne();
    res.json({ message: "Status deleted successfully" });
  } catch (err) {
    console.error("Delete status error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
