const nodemailer = require("nodemailer")

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
}
const transporter = nodemailer.createTransport(nodeConfig)

function sendEmail(recipient, subject, message) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient,
    subject: subject,
    text: message, // You can customize this to include HTML content as well
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error)
    } else {
      console.log("Email sent:", info.response)
    }
  })
}

module.exports = sendEmail
