const { User } = require("../models/index")

// Get user profile details
exports.getUserProfile = async (req, res) => {
  try {
    // Fetch the user's profile details, selecting only the desired fields.
    const user = await User.findById(req.user.userId).select(
      "username email contact gender address"
    )

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update user profile details
// exports.updateUserProfile = async (req, res) => {
//   try {
//     // Validate the request body
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     // Fetch the user by ID
//     let user = await User.findById(req.user.userId)

//     if (!user) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     user.username = req.body.username
//     user.contact = req.body.contact

//     // Save the updated user object
//     user = await user.save()

//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" })
//   }
// }

exports.updateUserProfile = async (req, res) => {
  try {
    // Check if the user making the request is the same as the user whose profile is being updated
    if (req.user.userId !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    // Fetch the user by ID
    let user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Update user data
    if (req.body.username) {
      user.username = req.body.username
    }
    if (req.body.contact) {
      user.contact = req.body.contact
    }

    // Save the updated user object
    user = await user.save()

    // Log the update
    console.log(`User ${user._id} updated their profile`)

    res.status(200).json(user)
  } catch (error) {
    console.error("Error updating user profile:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
