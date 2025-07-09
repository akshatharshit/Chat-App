import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mobile: { type: String, required: true, match: [/^\d{10}$/] },
    occupation: { type: String },
    description: { type: String },
    isAvailable: { type: Boolean, default: false },
    workDone: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
