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
    createdById: { type: String },
    occupancy: { type: String },
    category: { type: String },
    isPublic: { type: Boolean, default: false }, // public/private
    isOffline: { type: Boolean, default: false }, //offline/online
    location: {
      address: String, // Full address (e.g., "221B Baker Street, London")
      placeId: String, // Google Place ID (for precise reference)
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
