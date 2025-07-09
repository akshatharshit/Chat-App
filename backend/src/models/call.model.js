import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["ongoing", "ended", "missed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", callSchema);
export default Call;
