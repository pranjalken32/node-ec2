const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should match the model name for the User model
      required: true,
    },
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in days or months
    isFree: { type: Boolean, default: false }, // Set to true for free subscriptions
    price: { type: Number, default: 0 }, // Price for non-free subscriptions
  },
  { timestamps: true }
)

module.exports = mongoose.model("Subscription", subscriptionSchema)
