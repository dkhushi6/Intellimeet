import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  quantity: Number,
});

//For the purchases collection, each combination of userId and eventId must be unique
purchaseSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);
