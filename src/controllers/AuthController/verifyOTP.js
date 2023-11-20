const { User } = require("../../models/index")
/** POST: http://localhost:4000/api/auth/verifyOTP */
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.json({
      success: false,
      message: "Please provide your email and OTP.",
    })
  }

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found. Please check your email address.",
      })
    }

    const otpGenerationTime = user.otpGenerationTime
    const currentTime = new Date()
    const timeDifference = (currentTime - otpGenerationTime) / 60000 // Convert to minutes

    if (timeDifference > 10) {
      return res.json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      })
    }

    if (user.otp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP. Please check your OTP and try again.",
      })
    }

    // Clear the OTP field in the user's document
    user.otp = undefined

    await user.save()

    return res.json({
      success: true,
      message: "OTP verified successfully. You can now reset your password.",
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    })
  }
}

module.exports = verifyOTP
