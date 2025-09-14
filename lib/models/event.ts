import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String },
    longDescription: { type: String },
    shortDescription: { type: String },
    image: { type: String },
    visitCount: {
      type: Number,
      default: 0,
    },
    date: Date,
    startTime: { type: String },
    endTime: { type: String },
    price: Number,
    discountPrice: Number,
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    occupancy: { type: String },
    category: { type: String },
    isPublic: { type: Boolean, default: false }, // public/private
    isOffline: { type: Boolean, default: false }, //offline/online
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
