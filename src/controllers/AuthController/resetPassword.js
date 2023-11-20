const { User } = require("../../models/index")
const bcrypt = require("bcrypt")
/** PUT: http://localhost:4000/api/auth/resetPassword */
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body

  if (!email || !newPassword) {
    return res.json({
      success: false,
      message: "Please provide your email and new password.",
    })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found. Please check your email address.",
      })
    }

    // Hash the new password and update it in the user's document
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(newPassword, salt)
    user.password = hash

    await user.save()

    return res.json({
      success: true,
      message:
        "Password reset successful. You can now log in with your new password.",
    })
  } catch (error) {
    console.error("Error resetting password:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    })
  }
}
module.exports = resetPassword
