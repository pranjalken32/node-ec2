const { User } = require("../../models/index")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.json({
        success: false,
        message: "All fields must be filled",
      })
    } else {
      const user = await User.findOne({ email })

      if (!user) {
        res.json({
          success: false,
          message: "Email not registered",
        })
      } else {
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          res.json({
            success: false,
            message: "Incorrect Password",
          })
        } else {
          const userId = user._id
          const email = user.email
          const username = user.username
          const contact = user.contact

          const token = jwt.sign(
            { userId, username, email, contact },
            process.env.SECRET
          )

          res.json({
            success: true,
            message: "Login successful",
            token,
          })
        }
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Problem occured internally",
    })
  }
}

module.exports = loginController
