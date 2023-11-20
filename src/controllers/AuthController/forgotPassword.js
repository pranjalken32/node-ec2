const { User } = require("../../models/index")
const bcrypt = require("bcrypt")
const sendEmail = require("../../config/emailService")

const generateOTP = (user) => {
  // Get the current time
  const currentTime = new Date()

  if (!user.otpGenerationTime) {
    // Generate an OTP for the first time and update the OTP generation time
    const otp = Math.floor(1000 + Math.random() * 900).toString()
    user.otp = otp
    user.otpGenerationTime = currentTime
    return otp
  } else {
    // Calculate the time difference in minutes
    const timeDifference = (currentTime - user.otpGenerationTime) / 60000

    if (timeDifference >= 5) {
      // If at least 5 minutes have passed since the last OTP generation, generate a new OTP and update the OTP generation time
      const otp = Math.floor(1000 + Math.random() * 9000).toString()
      user.otp = otp
      user.otpGenerationTime = currentTime
      return otp
    } else {
      // Return the existing OTP and indicate the time remaining until a new OTP can be generated
      const timeRemaining = 5 - timeDifference
      return {
        otp: user.otp,
        timeRemaining: timeRemaining,
      }
    }
  }
}

const ForgotPassword = async (req, res, next) => {
  const { email } = req.body
  console.log(email)

  if (!email) {
    return res.json({
      success: false,
      message: "Please provide your email address.",
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

    const otp = generateOTP(user)
    user.otp = otp
    user.otpGenerationTime = new Date()
    await user.save()

    // Send an email with the OTP to the user for password reset
    const subject = "Password Reset OTP"
    const message = `Your OTP for resetting your password is: ${otp}`

    sendEmail(user.email, subject, message)

    return res.json({
      success: true,
      message:
        "An OTP has been sent to your email. Please check your email for instructions." +
        otp,
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    })
  }
}

module.exports = ForgotPassword
