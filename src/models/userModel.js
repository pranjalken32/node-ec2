const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    otp: {
      type: String,
      default: "",
    },
    otpGenerationTime: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Reference to Child documents associated with this user
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child", // This should match the model name for the Child model
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
