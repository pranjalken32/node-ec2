const sendEmail = require("../config/emailService")
const Child = require("../models/child")

// Controller function to add child information
async function addChild(req, res) {
  try {
    const {
      name,
      age,
      gender,
      initialComplaint,
      respondsToName,
      makesEyeContact,
      followsInstructions,
      sustainableAttention,
      enjoysPlayingWithPeers,
      aloofPlay,
      preDiagnosis,
      motorDifficulty,
    } = req.body
    const userId = req.user.userId // Get userId from the middleware
    console.log(userId)

    // if (!name || !age || !gender || !complaint) {
    //   return res.status(400).json({ error: "All fields are required" })
    // }

    const child = new Child({
      name,
      age,
      gender,
      initialComplaint,
      respondsToName,
      makesEyeContact,
      followsInstructions,
      sustainableAttention,
      enjoysPlayingWithPeers,
      aloofPlay,
      preDiagnosis,
      motorDifficulty,
      user: userId,
    })
    console.log(child)

    // Save the child data to the database
    await child.save()
    sendEmail(
      "orville61@ethereal.email",
      "signup succesfull",
      "create account succesfully"
    )
    return res
      .status(201)
      .json({ message: "Child information added successfully" })
  } catch (error) {
    console.error("Error adding child information:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

async function getChildrenForUser(req, res) {
  try {
    const userId = req.user.userId

    const children = await Child.find({ user: userId })

    return res.status(200).json({ children })
  } catch (error) {
    console.error("Error fetching child information:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  addChild,
  getChildrenForUser,
}
