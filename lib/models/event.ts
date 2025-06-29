import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    longDescription: String,
    shortDescription: String,
    image: String,
    day: String,
    date: Date,
    start: String,
    end: String,
    prize: Number,
    discountPrize: Number,
    createdById: String,
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

export default mongoose.model("Event", eventSchema);
