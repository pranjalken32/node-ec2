const mongoose = require("mongoose")

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    initialComplaint: {
      type: String,
      required: true,
    },
    respondsToName: {
      type: Boolean,
      default: false,
    },
    makesEyeContact: {
      type: Boolean,
      default: false,
    },
    followsInstructions: {
      type: Boolean,
      default: false,
    },
    sustainableAttention: {
      type: Boolean,
      default: false,
    },
    enjoysPlayingWithPeers: {
      type: Boolean,
      default: false,
    },
    aloofPlay: {
      type: Boolean,
      default: false,
    },
    preDiagnosis: {
      type: Boolean,
      default: false,
    },
    motorDifficulty: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

const Child = mongoose.model("Child", childSchema)

module.exports = Child
