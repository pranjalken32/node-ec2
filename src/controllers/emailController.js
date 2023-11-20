const sendEmail = require("../config/emailService") // Import the email service
const otpGenerator = require("otp-generator")

async function sendCustomEmail(req, res) {
  try {
    const { recipient, subject, message } = req.body

    sendEmail(recipient, subject, message)

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  sendCustomEmail,
}
