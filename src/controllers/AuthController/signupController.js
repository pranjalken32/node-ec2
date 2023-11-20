const { User } = require("../../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendCustomEmail } = require("../emailController")
const sendEmail = require("../../config/emailService")

const SignupController = async (req, res, next) => {
  const { username, email, password, state, city, contact, gender } = req.body
  if (
    !username ||
    !password ||
    !email ||
    !state ||
    !city ||
    !contact ||
    !gender
  ) {
    res.json({
      success: false,
      message: "Fill all the necessary details!",
    })
  } else {
    const emailExist = await User.findOne({ email })

    if (emailExist) {
      res.json({
        success: false,
        message: "Email already registered!",
      })
    } else {
      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(password, salt)

      const user = new User({
        username,
        email,
        password: hash,
        address: {
          state: state,
          city: city,
        },
        contact,
        gender,
      })

      user
        .save()
        .then(async (user) => {
          const userId = user._id
          const username = user.username
          const email = user.email
          const contact = user.contact

          const token = jwt.sign(
            { userId, username, email, contact },
            process.env.SECRET
          )

          res.json({
            success: true,
            message: "Signup successful",
            token,
          })
          sendEmail(email, "signup succesfull", "create account succesfully")
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "Internal error occured",
            error: err,
          })
        })
    }
  }
}

module.exports = SignupController
